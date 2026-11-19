import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const normalize = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .join("\n");

const vendored = readFileSync(path.join(ROOT, "packages/ui/src/styles/shadcn-tailwind.css"), "utf8");
const upstream = readFileSync(path.join(ROOT, "node_modules/shadcn/dist/tailwind.css"), "utf8");

if (normalize(vendored) !== normalize(upstream)) {
  console.error("✗ packages/ui/src/styles/shadcn-tailwind.css 與 node_modules/shadcn/dist/tailwind.css 不同步：複製上游內容並刪除註釋");
  process.exit(1);
}
console.log("✓ shadcn-tailwind.css 與上游一致");
