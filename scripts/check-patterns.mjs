import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";
import { ESLint } from "eslint";
import policy from "../packages/ui/lint.json" with { type: "json" };

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PATTERNS = path.join(ROOT, "plugins/coss-ui/skills/coss-ui/references/patterns.md");
const WORK = path.join(ROOT, "apps/storybook/.cache/patterns");

const blocks = [...fs.readFileSync(PATTERNS, "utf8").matchAll(/```tsx\n([\s\S]*?)```/g)].map((m) => m[1]);

fs.rmSync(WORK, { recursive: true, force: true });
fs.mkdirSync(WORK, { recursive: true });

let failed = false;
try {
  blocks.forEach((code, i) => fs.writeFileSync(path.join(WORK, `block-${i + 1}.tsx`), code));
  const ui = path.join(ROOT, "packages/ui/src");
  fs.writeFileSync(
    path.join(WORK, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        baseUrl: ROOT,
        paths: {
          "@/*": [`${ui}/*`],
          "@coss-app/ui/components/*": [`${ui}/components/ui/*`],
          "@coss-app/ui/lib/*": [`${ui}/lib/*`],
          "@coss-app/ui/hooks/*": [`${ui}/hooks/*`],
        },
      },
      include: ["*.tsx"],
    }),
  );

  const tsc = spawnSync("npx", ["tsc", "-p", path.join(WORK, "tsconfig.json")], { cwd: ROOT, encoding: "utf8" });
  if (tsc.status !== 0) {
    failed = true;
    console.error(tsc.stdout + tsc.stderr);
  }

  const eslint = new ESLint({
    cwd: ROOT,
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ["**/*.tsx"],
        languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true } } },
        plugins: { shadcn },
        settings: policy.settings,
        rules: policy.rules,
      },
    ],
  });
  const results = await eslint.lintFiles([path.join(WORK, "*.tsx")]);
  for (const result of results) {
    for (const message of result.messages) {
      failed = true;
      console.error(`patterns.md ${path.basename(result.filePath)}:${message.line} [${message.ruleId}] ${message.message}`);
    }
  }
} finally {
  fs.rmSync(WORK, { recursive: true, force: true });
}

if (failed) process.exit(1);
console.log(`✓ patterns.md ${blocks.length} 個 tsx 區塊型別與 lint 皆通過`);
