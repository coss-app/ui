#!/usr/bin/env node
/**
 * 由組件原始碼、story、globals.css 產生 coss-ui skill 的參考資料：
 *   plugins/coss-ui/manifest.json                                   機器可讀（日後 MCP 讀同一份）
 *   plugins/coss-ui/skills/coss-ui/references/components.md         組件索引
 *   plugins/coss-ui/skills/coss-ui/references/tokens.md             色彩與其他 token
 *
 * 用法：
 *   npm run manifest             寫入檔案
 *   npm run manifest -- --check  與磁碟內容比對，不一致就 exit 1（CI 用）
 *
 * 用途說明（component-notes.json）為手寫；任何組件缺說明、或說明對不到組件，都會失敗。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { formatImport, parseExports } from "./parse-exports.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS_DIR = path.join(ROOT, "packages/ui/src/components/ui");
const STORIES_DIR = path.join(ROOT, "apps/storybook/stories");
const GLOBALS_CSS = path.join(ROOT, "packages/ui/src/styles/globals.css");
const PKG_JSON = path.join(ROOT, "packages/ui/package.json");
const NOTES_JSON = path.join(ROOT, "scripts/component-notes.json");
const PLUGIN_DIR = path.join(ROOT, "plugins/coss-ui");
const MANIFEST_JSON = path.join(PLUGIN_DIR, "manifest.json");
const REFERENCES_DIR = path.join(PLUGIN_DIR, "skills/coss-ui/references");

const DOCS_ORIGIN = "https://ui.coss.com.tw";
/* 與 apps/storybook/.storybook/preview.tsx 的 storySort 一致 */
const CATEGORY_ORDER = ["Inputs", "Overlays", "Navigation", "Data Display", "Feedback", "Messaging", "Layout"];
const GENERATED_NOTICE =
  "<!-- 由 scripts/build-manifest.mjs 產生，請勿手改。改組件、story、globals.css 或 component-notes.json 後執行 npm run manifest。 -->";

const errors = [];
const fail = (message) => errors.push(message);
const read = (file) => fs.readFileSync(file, "utf8");

/** button-group → ButtonGroup（只用於標題顯示） */
const pascal = (slug) =>
  slug
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");

/* ───────── cva variants ───────── */

function propertyName(node) {
  if (!node.name) return undefined;
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) return node.name.text;
  return undefined;
}

function objectProps(node) {
  return node && ts.isObjectLiteralExpression(node) ? node.properties.filter(ts.isPropertyAssignment) : [];
}

function literalText(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return "true";
  if (node.kind === ts.SyntaxKind.FalseKeyword) return "false";
  if (ts.isNumericLiteral(node)) return node.text;
  return undefined;
}

/** 找出檔內所有 `const xxx = cva(base, { variants, defaultVariants })`，只取名稱，不取 class 字串 */
function parseCva(source, fileName) {
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found = [];
  const visit = (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      ts.isIdentifier(node.initializer.expression) &&
      node.initializer.expression.text === "cva"
    ) {
      const config = node.initializer.arguments[1];
      const groups = {};
      const defaults = {};
      for (const prop of objectProps(config)) {
        const key = propertyName(prop);
        if (key === "variants") {
          for (const group of objectProps(prop.initializer)) {
            const groupName = propertyName(group);
            if (groupName) groups[groupName] = objectProps(group.initializer).map(propertyName).filter(Boolean);
          }
        } else if (key === "defaultVariants") {
          for (const d of objectProps(prop.initializer)) {
            const name = propertyName(d);
            const value = literalText(d.initializer);
            if (name && value !== undefined) defaults[name] = value;
          }
        }
      }
      if (Object.keys(groups).length > 0) found.push({ name: node.name.text, groups, defaults });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return found;
}

/* ───────── 組件 ───────── */

function storyInfo(slug) {
  const file = path.join(STORIES_DIR, `${slug}.stories.tsx`);
  if (!fs.existsSync(file)) {
    fail(`缺少 story：apps/storybook/stories/${slug}.stories.tsx（story 檔名須與組件檔名相同）`);
    return undefined;
  }
  const match = read(file).match(/const meta\s*=\s*\{[\s\S]*?\btitle:\s*"([^"]+)"/);
  const title = match?.[1];
  if (!title || !/^[^/]+\/[^/]+$/.test(title)) {
    fail(`${slug}.stories.tsx：meta.title 須為「分類/名稱」，目前讀到 ${JSON.stringify(title)}`);
    return undefined;
  }
  const [category] = title.split("/");
  if (!CATEGORY_ORDER.includes(category)) {
    fail(`${slug}.stories.tsx：分類「${category}」不在 CATEGORY_ORDER（需與 preview.tsx 的 storySort 同步）`);
  }
  /* Storybook 的 id：每段轉小寫，非英數字元換成 "-"，不拆 camelCase */
  const id = title
    .split("/")
    .map((s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
    .join("-");
  return { title, category, docsUrl: `${DOCS_ORIGIN}/?path=/docs/${id}--docs` };
}

function collectComponents(notes) {
  const slugs = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""))
    .sort();

  for (const slug of slugs) if (!notes[slug]) fail(`component-notes.json 缺少「${slug}」的用途說明`);
  for (const slug of Object.keys(notes)) if (!slugs.includes(slug)) fail(`component-notes.json 的「${slug}」找不到對應組件檔`);

  return slugs.map((slug) => {
    const source = read(path.join(COMPONENTS_DIR, `${slug}.tsx`));
    const exports = parseExports(source);
    if (exports.length === 0) fail(`${slug}.tsx：解析不到任何匯出（須保留檔尾 export 區塊）`);
    const story = storyInfo(slug);
    return {
      slug,
      name: pascal(slug),
      description: notes[slug] ?? "",
      import: formatImport(exports, slug),
      exports,
      category: story?.category ?? "?",
      title: story?.title ?? "?",
      docsUrl: story?.docsUrl ?? "",
      variants: parseCva(source, `${slug}.tsx`),
    };
  });
}

/* ───────── tokens ───────── */

/** 取出 `header {` 到對應 `}` 之間的文字（計算大括號深度，容許內層 @keyframes） */
function extractBlock(css, header) {
  const start = css.indexOf(header);
  if (start === -1) {
    fail(`globals.css 找不到 ${header} 區塊`);
    return "";
  }
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) return css.slice(css.indexOf("{", start) + 1, i);
  }
  fail(`globals.css 的 ${header} 區塊沒有結尾`);
  return "";
}

/** 單行宣告 `--name: value; /* 註解 *\/`；跨行的值（如 --font-sans）不收 */
function parseDeclarations(block) {
  const decls = new Map();
  for (const line of block.split("\n")) {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/);
    if (m) decls.set(m[1].slice(2), { value: m[2], comment: m[3] ?? "" });
  }
  return decls;
}

const TOKEN_GROUPS = [
  ["表面與文字", /^(background|foreground|heading|card|card-foreground|popover|popover-foreground)$/],
  ["品牌與主要動作", /^(primary|primary-foreground|primary-hover|primary-disabled|brand)$/],
  ["中性與邊框", /^(secondary|secondary-foreground|muted|muted-foreground|placeholder|accent|accent-foreground|border|border-strong|input|ring)$/],
  ["狀態色", /^(destructive|destructive-foreground|destructive-muted|success-foreground|success-muted|info|info-muted|info-foreground|info-subtle|warning|warning-muted|warning-bright|star)$/],
  ["浮層與預覽", /^(toast|toast-foreground|overlay|viewer|viewer-foreground)$/],
  ["看板主題色", /^banner-/],
  ["即時統計色階", /^stat-/],
  ["圖表", /^chart-/],
  ["側邊欄", /^sidebar/],
];

function collectTokens(css) {
  const root = parseDeclarations(extractBlock(css, ":root {"));
  const dark = parseDeclarations(extractBlock(css, ".dark {"));
  const theme = parseDeclarations(extractBlock(css, "@theme {"));
  const inline = parseDeclarations(extractBlock(css, "@theme inline {"));

  const colors = [];
  for (const [name, { value, comment }] of root) {
    if (!value.startsWith("#")) continue;
    const group = TOKEN_GROUPS.find(([, re]) => re.test(name));
    if (!group) fail(`globals.css 色彩 token「${name}」不屬於任何 TOKEN_GROUPS 分組（請在 build-manifest.mjs 補上）`);
    colors.push({
      name,
      group: group?.[0] ?? "?",
      light: value,
      dark: dark.get(name)?.value ?? null,
      /* 有 @theme inline 的 --color-<name> 才會產生 bg-／text-／border- utility */
      utility: inline.has(`color-${name}`),
      comment,
    });
  }

  const others = [];
  const push = (kind, name, utility, value, comment) => others.push({ kind, name, utility, value, comment });
  push("圓角", "radius", "rounded-lg", root.get("radius")?.value ?? "?", root.get("radius")?.comment ?? "");
  for (const [name, { value }] of inline) {
    if (name.startsWith("radius-")) push("圓角", name, `rounded-${name.slice(7)}`, value, "");
  }
  for (const [name, { value }] of theme) {
    if (name.startsWith("shadow-")) push("陰影（只給浮層）", name, name, value, "");
    else if (name.startsWith("ease-")) push("動畫曲線", name, name, value, "");
    else if (name.startsWith("animate-")) push("動畫", name, name, value, "");
  }
  return { colors, others };
}

/* ───────── 輸出 ───────── */

function renderComponentsMd(components, pkgVersion) {
  const lines = [
    GENERATED_NOTICE,
    "",
    "# coss UI 組件索引",
    "",
    `對應 \`@coss-app/ui\` **${pkgVersion}**，共 ${components.length} 個組件。每個組件的 props 與互動範例以文件站為準（連結在各組件下方）。`,
    "",
    "引用一律走 `@coss-app/ui/components/<檔名>`；以下 import 為可直接複製的完整匯出清單，只留用到的名稱。",
  ];
  for (const category of CATEGORY_ORDER) {
    const inCategory = components.filter((c) => c.category === category);
    if (inCategory.length === 0) continue;
    lines.push("", `## ${category}（${inCategory.length}）`);
    for (const c of inCategory) {
      lines.push("", `### ${c.name} · \`${c.slug}\``, "", c.description, "", "```tsx", c.import, "```");
      for (const v of c.variants) {
        const parts = Object.entries(v.groups).map(([group, options]) => {
          const shown = options.map((o) => (v.defaults[group] === o ? `**${o}**` : o)).join(" · ");
          return `${group}：${shown}`;
        });
        lines.push("", `\`${v.name}\` — ${parts.join("；")}（粗體為預設）`);
      }
      lines.push("", `[文件](${c.docsUrl})`);
    }
  }
  return lines.join("\n") + "\n";
}

function renderTokensMd(tokens, pkgVersion) {
  const cell = (s) => s.replace(/\|/g, "\\|");
  const lines = [
    GENERATED_NOTICE,
    "",
    "# coss UI token",
    "",
    `對應 \`@coss-app/ui\` **${pkgVersion}**。來源是 \`globals.css\`（唯一 token 來源），消費端引入 \`@coss-app/ui/globals.css\` 即得到全部。`,
    "",
    "寫 class 時只用語意名稱，不寫 HEX 或任意值（如 `bg-[#00a756]`）：深色模式由 token 自動切換。",
    "「Utility」欄的名稱可搭配 `bg-`、`text-`、`border-`、`ring-`、`fill-` 等色彩前綴，例如 `bg-primary`、`text-muted-foreground`、`border-border`。",
  ];
  for (const [groupName] of TOKEN_GROUPS) {
    const rows = tokens.colors.filter((t) => t.group === groupName);
    if (rows.length === 0) continue;
    lines.push("", `## ${groupName}`, "", "| Utility | 淺色 | 深色 | 用途 |", "| --- | --- | --- | --- |");
    for (const t of rows) {
      const utility = t.utility ? `\`${t.name}\`` : `\`var(--${t.name})\`（無 utility）`;
      lines.push(`| ${utility} | \`${t.light}\` | ${t.dark ? `\`${t.dark}\`` : "同淺色"} | ${cell(t.comment)} |`);
    }
  }
  const kinds = [...new Set(tokens.others.map((o) => o.kind))];
  for (const kind of kinds) {
    lines.push("", `## ${kind}`, "", "| Utility | 值 |", "| --- | --- |");
    for (const o of tokens.others.filter((x) => x.kind === kind)) {
      lines.push(`| \`${o.utility}\` | \`${cell(o.value)}\` |`);
    }
  }
  return lines.join("\n") + "\n";
}

function main() {
  const check = process.argv.includes("--check");
  const pkg = JSON.parse(read(PKG_JSON));
  const notes = JSON.parse(read(NOTES_JSON));
  const components = collectComponents(notes);
  const tokens = collectTokens(read(GLOBALS_CSS));

  const manifest = {
    package: pkg.name,
    version: pkg.version,
    docs: DOCS_ORIGIN,
    categories: CATEGORY_ORDER,
    components: components.map(({ slug, name, description, import: importSnippet, exports, category, title, docsUrl, variants }) => ({
      slug,
      name,
      description,
      importPath: `@coss-app/ui/components/${slug}`,
      import: importSnippet,
      exports,
      category,
      title,
      docsUrl,
      variants,
    })),
    tokens,
  };

  if (errors.length > 0) {
    console.error(`manifest 產生失敗（${errors.length} 個問題）：`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const outputs = new Map([
    [MANIFEST_JSON, JSON.stringify(manifest, null, 2) + "\n"],
    [path.join(REFERENCES_DIR, "components.md"), renderComponentsMd(components, pkg.version)],
    [path.join(REFERENCES_DIR, "tokens.md"), renderTokensMd(tokens, pkg.version)],
  ]);

  const stale = [];
  for (const [file, content] of outputs) {
    const current = fs.existsSync(file) ? read(file) : null;
    if (current === content) continue;
    stale.push(path.relative(ROOT, file));
    if (!check) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
    }
  }

  if (check) {
    if (stale.length > 0) {
      console.error("下列檔案與原始碼不同步，請執行 npm run manifest 並一起提交：");
      for (const f of stale) console.error(`  - ${f}`);
      process.exit(1);
    }
    console.log(`manifest 已同步（${components.length} 個組件）`);
    return;
  }
  console.log(
    stale.length > 0
      ? `已更新 ${stale.length} 個檔案（${components.length} 個組件）：\n${stale.map((f) => `  - ${f}`).join("\n")}`
      : `沒有變動（${components.length} 個組件）`,
  );
}

main();
