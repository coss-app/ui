#!/usr/bin/env node
/**
 * 檢查程式碼有沒有違反 coss-ui 的寫法規則（純文字比對，無依賴，Node 18+）。
 *
 * 用法：
 *   node check-usage.mjs [檔案或資料夾 ...]   不給參數時掃描目前資料夾
 *   有違規 → 逐行印出並 exit 1；沒有 → exit 0
 *
 * 只掃 .tsx／.jsx／.ts／.js；略過 node_modules、dist、.next、build 等產物資料夾。
 * 刻意例外的那一行，在同一行任何位置放上註解文字 coss-ui-ignore 即可略過
 * （一般程式用行尾的雙斜線註解，JSX 內用大括號包起來的區塊註解）。
 *
 * 規則與原因見 SKILL.md「硬規則」與 references/design-rules.md。
 * 型別檢查抓得到 asChild 與不存在的 variant，抓不到的是下面的顏色與字重。
 */
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = new Set([".tsx", ".jsx", ".ts", ".js"]);
const SKIP_DIRS = new Set(["node_modules", "dist", "build", "out", ".next", ".turbo", ".git", "coverage", "storybook-static"]);

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const COLOR_PREFIX = "bg|text|border|ring|fill|stroke|from|via|to|outline|divide|decoration|shadow|accent|caret";

const RULES = [
  {
    id: "arbitrary-color",
    re: /\b[\w-]+-\[(?:#[0-9a-fA-F]{3,8}|(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\()/,
    message: "Tailwind 任意色值：改用語意 token（bg-primary、text-muted-foreground…），見 references/tokens.md",
  },
  {
    id: "hex-literal",
    re: /["'`]#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})["'`]/,
    message: "寫死的 HEX 色碼：改用 token class，或在 style 中用 var(--primary) 等 CSS 變數",
  },
  {
    id: "default-palette",
    re: new RegExp(`\\b(?:${COLOR_PREFIX})-(?:${PALETTE})-(?:50|100|200|300|400|500|600|700|800|900|950)\\b`),
    message: "Tailwind 預設色票：改用語意 token；灰階全部帶靛藍調，沒有 gray-*／slate-*",
  },
  {
    id: "pure-black",
    re: /\b(?:bg|text|border|ring|fill|stroke)-black\b/,
    message: "純黑：內文用 text-foreground，次要用 text-muted-foreground",
  },
  {
    id: "font-weight",
    re: /\bfont-(?:bold|extrabold|black)\b/,
    message: "字重只用 400／500／600：標題與按鈕用 font-semibold，內文用預設",
  },
  {
    id: "as-child",
    re: /\basChild\b/,
    message: "Base UI 沒有 asChild：改用 render，例如 <DialogTrigger render={<Button />}>",
  },
  {
    id: "radix-state-selector",
    re: /\bdata-\[state=(?:open|closed|checked|unchecked|active|inactive|on|off)\]/,
    message: "Base UI 的狀態屬性是 data-open、data-checked…，不是 data-[state=…]",
  },
  {
    id: "local-ui-import",
    re: /from\s+["']@\/components\/ui\//,
    message: "組件一律從 @coss-app/ui/components/<名稱> 引用，不要引用或複製本地副本",
  },
];

const IGNORE = /coss-ui-ignore/;

function* walk(target) {
  const stat = fs.statSync(target, { throwIfNoEntry: false });
  if (!stat) {
    console.error(`找不到：${target}`);
    process.exitCode = 2;
    return;
  }
  if (stat.isFile()) {
    if (EXTENSIONS.has(path.extname(target))) yield target;
    return;
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith(".")) yield* walk(path.join(target, entry.name));
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      yield path.join(target, entry.name);
    }
  }
}

const targets = process.argv.slice(2);
const roots = targets.length > 0 ? targets : ["."];
const violations = [];
let scanned = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    scanned++;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (IGNORE.test(line)) return;
      for (const rule of RULES) {
        if (rule.re.test(line)) violations.push(`${path.relative(process.cwd(), file) || file}:${i + 1}  [${rule.id}] ${rule.message}\n    ${line.trim().slice(0, 140)}`);
      }
    });
  }
}

if (violations.length > 0) {
  console.error(violations.join("\n"));
  console.error(`\n共 ${violations.length} 處違規（掃描 ${scanned} 個檔案）。刻意例外請在該行加 coss-ui-ignore。`);
  process.exit(1);
}
if (process.exitCode !== 2) console.log(`沒有發現違規（掃描 ${scanned} 個檔案）`);
