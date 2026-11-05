/**
 * 組件檔的匯出解析與引用語句格式化。
 * 文件站（apps/storybook/.storybook/docs-page.tsx）與 skill manifest（scripts/build-manifest.mjs）共用，
 * 以免兩邊對「這個組件有哪些匯出」的答案分歧。型別宣告在 parse-exports.d.mts。
 */

/** 從組件原始碼取出可用匯出名稱：`export { … }`（含 as 別名）與 `export function/const`；排除 `type` 匯出。 */
export function parseExports(source) {
  const names = [];
  for (const block of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const raw of block[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/).pop()?.trim();
      if (name && !name.startsWith("type ")) names.push(name);
    }
  }
  for (const m of source.matchAll(/export\s+(?:function|const)\s+(\w+)/g)) {
    names.push(m[1]);
  }
  return [...new Set(names)];
}

/** 產生消費端引用語句；單行超過 80 字元就換行展開。 */
export function formatImport(names, module) {
  const from = `"@coss-app/ui/components/${module}"`;
  const oneLine = `import { ${names.join(", ")} } from ${from};`;
  if (oneLine.length <= 80) return oneLine;
  return `import {\n${names.map((n) => `  ${n},`).join("\n")}\n} from ${from};`;
}
