import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { findComments } from "../scripts/check-no-comments.mjs";

describe("findComments", () => {
  it("抓 html 註釋與內嵌 style 的 CSS 註釋", () => {
    assert.deepEqual(findComments("a.html", "<!-- x -->\n<style>\n/* y */\n</style>"), [1, 3]);
  });
  it("抓 yaml 整行與行尾註釋，放行字串與表達式中的 #", () => {
    const yaml = ["# a", "name: x # b", 'run: echo "#not"', "if: ${{ github.ref }}"].join("\n");
    assert.deepEqual(findComments("a.yml", yaml), [1, 2]);
  });
  it("其他副檔名不檢查", () => {
    assert.deepEqual(findComments("a.md", "<!-- x -->"), []);
  });
});
