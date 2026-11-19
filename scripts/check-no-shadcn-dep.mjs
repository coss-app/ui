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
if (pkg.dependencies?.cn) {
  errors.push("packages/ui/package.json 的 dependencies 不可有 cn（shadcn CLI 自動加入），請移除並改用 @/lib/utils");
}
if (/@import\s+["']shadcn\//.test(css)) {
  errors.push('globals.css 不可 @import "shadcn/…"，請改用 ./shadcn-tailwind.css');
}

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log("✓ @coss-app/ui 未依賴 shadcn CLI");
