import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const STAMP = path.join(ROOT, ".claude/.verify-hash");
const input = JSON.parse(readFileSync(0, "utf8") || "{}");

const git = (...args) => spawnSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).stdout;

const status = git("status", "--porcelain");
if (!status.trim()) process.exit(0);

const hash = createHash("sha256");
hash.update(status);
hash.update(git("diff", "HEAD"));
for (const file of git("ls-files", "--others", "--exclude-standard").split("\n").filter(Boolean)) {
  hash.update(file);
  hash.update(readFileSync(path.join(ROOT, file)));
}
const digest = hash.digest("hex");

if (existsSync(STAMP) && readFileSync(STAMP, "utf8") === digest) process.exit(0);

const verify = spawnSync("npm", ["run", "verify"], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
if (verify.status === 0) {
  writeFileSync(STAMP, digest);
  process.exit(0);
}

const tail = `${verify.stdout}${verify.stderr}`.trim().split("\n").slice(-40).join("\n");
if (input.stop_hook_active) {
  process.stdout.write(JSON.stringify({ systemMessage: `npm run verify 未通過（已不再阻擋）：\n${tail}` }));
  process.exit(0);
}
process.stderr.write(`npm run verify 未通過，修正後再結束：\n${tail}\n`);
process.exit(2);
