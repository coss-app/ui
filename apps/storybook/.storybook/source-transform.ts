/**
 * Docs「Show code」的 source transform：
 * 1. 拆掉 `{ render: () => … }` 外殼，只留 JSX
 * 2. 把 story 檔內自訂的 helper 組件／常數／型別補在範例前面，
 *    讓使用者看得到真正的組合寫法（而不是 `<ReminderPopover />`）
 */

/** story 原始碼（eager：transform 是同步的） */
const storySources = import.meta.glob<string>("../stories/*.stories.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

type Decl = { name: string; code: string };

const declCache = new Map<string, Decl[]>();

/** 解析檔案頂層的 function／const／type 宣告（依檔案順序） */
function parseTopLevelDecls(source: string): Decl[] {
  const lines = source.split("\n");
  const decls: Decl[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(?:export\s+)?(?:function\s+(\w+)|const\s+(\w+)\b|type\s+(\w+)\b)/);
    if (!m) continue;
    const name = m[1] ?? m[2] ?? m[3];
    // meta／Story 型別屬於 story 檔本身，不是範例的一部分
    if (name === "meta" || name === "Story") continue;
    let end = i;
    if (m[1]) {
      // function：到下一個單獨一行的 `}`（簽名裡的 `}: {` 不算）
      while (end < lines.length && !/^}\s*$/.test(lines[end])) end++;
    } else {
      // const／type：到第一個以 `;` 結尾、且下一行是空行（或檔尾）的行
      while (end < lines.length - 1) {
        if (/;\s*$/.test(lines[end]) && !lines[end + 1].trim()) break;
        end++;
      }
    }
    decls.push({ name, code: lines.slice(i, end + 1).join("\n").replace(/^export\s+/, "") });
    i = end;
  }
  declCache.set(source, decls);
  return decls;
}

function declsOf(fileName: string | undefined): Decl[] {
  const key = Object.keys(storySources).find(
    (k) => fileName && k.endsWith(fileName.replace(/^\.\/stories\//, "/")),
  );
  if (!key) return [];
  const source = storySources[key];
  return declCache.get(source) ?? parseTopLevelDecls(source);
}

function dedent(text: string) {
  const lines = text.split("\n");
  const indents = lines
    .slice(1)
    .filter((l) => l.trim())
    .map((l) => l.match(/^ */)![0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return [lines[0], ...lines.slice(1).map((l) => l.slice(min))].join("\n");
}

/** `{\n  render: (args) => BODY\n}` → BODY */
function unwrapRender(code: string) {
  // render 前面可能還有 name／args：一併丟掉，只留 JSX
  const m = code.match(/^\{[\s\S]*?\n {2}render:\s*\([^)]*\)\s*=>\s*([\s\S]*?)\s*\}$/);
  if (!m) return code;
  let body = m[1];
  const paren = body.match(/^\(\s*([\s\S]*?)\s*\)$/);
  if (paren && body.trimStart().startsWith("(")) body = paren[1];
  return dedent(body);
}

function withHelpers(code: string, decls: Decl[]) {
  if (!decls.length) return code;
  const used = new Set<string>();
  const visit = (text: string) => {
    for (const d of decls) {
      if (used.has(d.name) || !new RegExp(`\\b${d.name}\\b`).test(text)) continue;
      used.add(d.name);
      visit(d.code);
    }
  };
  visit(code);
  const helpers = decls.filter((d) => used.has(d.name));
  if (!helpers.length) return code;
  return `${helpers.map((d) => d.code).join("\n\n")}\n\n${code}`;
}

export function transformSource(
  code: string,
  context: { parameters?: { fileName?: string } },
) {
  const unwrapped = unwrapRender(code);
  return withHelpers(unwrapped, declsOf(context.parameters?.fileName));
}
