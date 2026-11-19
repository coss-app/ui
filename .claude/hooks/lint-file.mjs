import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const input = JSON.parse(readFileSync(0, "utf8") || "{}");
const file = input.tool_input?.file_path;

if (!file || path.relative(ROOT, file).startsWith("..")) process.exit(0);

const run = (command, args) => spawnSync(command, args, { cwd: ROOT, encoding: "utf8" });

let result = null;
if (/\.(ts|tsx|mts|mjs|css)$/.test(file)) {
  result = run("npx", ["eslint", "--no-warn-ignored", file]);
} else if (/\.(html|ya?ml)$/.test(file)) {
  result = run("node", ["scripts/check-no-comments.mjs"]);
}

if (result && result.status !== 0) {
  process.stderr.write(`${result.stdout}${result.stderr}`.trim() + "\n");
  process.exit(2);
}
