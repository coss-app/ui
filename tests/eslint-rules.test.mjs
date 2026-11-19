import { describe, it } from "node:test";
import assert from "node:assert/strict";
import css from "@eslint/css";
import { ESLint, RuleTester } from "eslint";
import { tailwind4 } from "tailwind-csstree";
import coss from "../eslint-rules/index.mjs";

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } } },
});

tester.run("coss/no-comments", coss.rules["no-comments"], {
  valid: ["const a = 1;", "const s = '// not a comment';", "const t = `/* nor this */`;"],
  invalid: [
    { code: "// line\nconst a = 1;", errors: 1 },
    { code: "const a = 1; /* block */", errors: 1 },
    { code: "/** doc */\nexport const a = 1;", errors: 1 },
    { code: "const a = <div>{/* jsx */}</div>;", errors: 1 },
    { code: "// a\n// b\nconst a = 1;", errors: 2 },
  ],
});

tester.run("coss/menu-label-in-group", coss.rules["menu-label-in-group"], {
  valid: [
    "<DropdownMenuGroup><DropdownMenuLabel>x</DropdownMenuLabel></DropdownMenuGroup>",
    "<DropdownMenuRadioGroup><DropdownMenuLabel>x</DropdownMenuLabel></DropdownMenuRadioGroup>",
    "<ContextMenuGroup><div><ContextMenuLabel>x</ContextMenuLabel></div></ContextMenuGroup>",
    "<MenubarGroup><MenubarLabel>x</MenubarLabel></MenubarGroup>",
    "<Label>x</Label>",
  ],
  invalid: [
    { code: "<DropdownMenuContent><DropdownMenuLabel>x</DropdownMenuLabel></DropdownMenuContent>", errors: 1 },
    { code: "<ContextMenuLabel>x</ContextMenuLabel>", errors: 1 },
    { code: "<MenubarContent><MenubarLabel>x</MenubarLabel></MenubarContent>", errors: 1 },
  ],
});

describe("coss/no-comments（CSS）", () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ["**/*.css"],
        plugins: { css, coss },
        language: "css/css",
        languageOptions: { customSyntax: tailwind4, tolerant: true },
        rules: { "coss/no-comments": "error" },
      },
    ],
  });

  it("擋下 CSS 註釋", async () => {
    const [result] = await eslint.lintText("/* c */\n:root { --a: #fff; }\n", { filePath: "x.css" });
    assert.equal(result.messages.length, 1);
  });

  it("放行含 Tailwind v4 語法、無註釋的 CSS", async () => {
    const source = '@source "../components";\n@custom-variant dark (&:is(.dark *));\n@theme inline { --color-a: var(--a); }\n';
    const [result] = await eslint.lintText(source, { filePath: "x.css" });
    assert.equal(result.messages.length, 0);
  });
});
