import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "plugins/coss-ui/skills/coss-ui/scripts/check-usage.mjs");

const run = (file) => spawnSync("node", [SCRIPT, file], { encoding: "utf8" });

describe("skill 的 check-usage.mjs", () => {
  let dir;
  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "coss-usage-"));
  });
  after(() => fs.rmSync(dir, { recursive: true, force: true }));

  const cases = [
    ["arbitrary-color", '<div className="bg-[#00a756]" />'],
    ["hex-literal", 'const c = "#00a756";'],
    ["default-palette", '<div className="text-gray-600" />'],
    ["pure-black", '<div className="text-black" />'],
    ["font-weight", '<div className="font-bold" />'],
    ["as-child", "<DialogTrigger asChild />"],
    ["radix-state-selector", '<div className="data-[state=open]:flex" />'],
    ["local-ui-import", 'import { Button } from "@/components/ui/button";'],
  ];

  for (const [id, source] of cases) {
    it(`抓出 ${id}`, () => {
      const file = path.join(dir, `${id}.tsx`);
      fs.writeFileSync(file, source + "\n");
      const result = run(file);
      assert.equal(result.status, 1);
      assert.match(result.stderr, new RegExp(`\\[${id}\\]`));
    });
  }

  it("放行正常寫法與 coss-ui-ignore", () => {
    const file = path.join(dir, "ok.tsx");
    fs.writeFileSync(
      file,
      'import { Button } from "@coss-app/ui/components/button";\nconst a = <Button className="bg-primary text-foreground font-semibold" />;\nconst b = "#00a756"; coss-ui-ignore\n',
    );
    assert.equal(run(file).status, 0);
  });
});
