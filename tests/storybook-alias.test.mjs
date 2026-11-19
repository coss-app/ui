import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const main = fs.readFileSync(path.join(ROOT, "apps/storybook/.storybook/main.ts"), "utf8");
const tsconfig = JSON.parse(fs.readFileSync(path.join(ROOT, "apps/storybook/tsconfig.json"), "utf8"));

describe("Storybook alias 與 tsconfig paths", () => {
  const viteAliases = [...main.matchAll(/find:\s*\/\^([^/]+(?:\\\/[^/]+)*?)\\\/\/,\s*replacement:\s*`\$\{uiSrc\}\/([^`]*)`/g)].map(
    ([, find, target]) => [find.replaceAll("\\/", "/"), target],
  );

  it("main.ts 找得到 alias", () => {
    assert.ok(viteAliases.length >= 3);
  });

  it("每個 vite alias 在 tsconfig paths 有對應，且指向同一目錄", () => {
    for (const [find, target] of viteAliases) {
      const key = find === "@" ? "@/*" : `${find}/*`;
      const expected = `../../packages/ui/src/${target}*`;
      assert.deepEqual(tsconfig.compilerOptions.paths[key], [expected], key);
    }
  });

  it("tsconfig paths 沒有 vite 沒有的 alias", () => {
    const keys = viteAliases.map(([find]) => (find === "@" ? "@/*" : `${find}/*`)).sort();
    assert.deepEqual(Object.keys(tsconfig.compilerOptions.paths).sort(), keys);
  });
});
