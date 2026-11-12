#!/usr/bin/env node
/**
 * 確認 @coss-app/ui 不讓使用端安裝 shadcn CLI：
 * - package.json 的 dependencies 不可有 shadcn（其相依 ts-morph／deepmerge 的弱點使用端無法自行修正）
 * - globals.css 不可 @import "shadcn/…"，須用內建的 ./shadcn-tailwind.css
 * shadcn CLI 的 add 可能把它加回來，故在 CI 檢查。
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(path.join(ROOT, "packages/ui/package.json"), "utf8"));
const css = readFileSync(path.join(ROOT, "packages/ui/src/styles/globals.css"), "utf8");

const errors = [];
if (pkg.dependencies?.shadcn) {
  errors.push("packages/ui/package.json 的 dependencies 不可有 shadcn，請移到 devDependencies");
}
if (/@import\s+["']shadcn\//.test(css)) {
  errors.push('globals.css 不可 @import "shadcn/…"，請改用 ./shadcn-tailwind.css');
}

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log("✓ @coss-app/ui 未依賴 shadcn CLI");
