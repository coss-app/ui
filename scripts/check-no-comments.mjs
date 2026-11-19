import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const stripQuoted = (line) => line.replace(/"(?:[^"\\]|\\.)*"|'[^']*'/g, '""');

export function findComments(file, text) {
  const hits = [];
  const lines = text.split("\n");
  if (file.endsWith(".html")) {
    lines.forEach((line, i) => {
      if (line.includes("<!--") || line.includes("/*")) hits.push(i + 1);
    });
  } else if (/\.ya?ml$/.test(file)) {
    lines.forEach((line, i) => {
      if (/(^|\s)#/.test(stripQuoted(line))) hits.push(i + 1);
    });
  }
  return hits;
}

function main() {
  const files = execSync("git ls-files --cached --others --exclude-standard", { cwd: ROOT, encoding: "utf8" })
    .split("\n")
    .filter((f) => /\.(html|ya?ml)$/.test(f));
  let failed = 0;
  for (const file of files) {
    for (const line of findComments(file, readFileSync(path.join(ROOT, file), "utf8"))) {
      console.error(`✗ ${file}:${line} 程式碼不得有註釋`);
      failed++;
    }
  }
  if (failed) process.exit(1);
  console.log("✓ html／yml 無註釋");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
