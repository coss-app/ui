import css from "@eslint/css";
import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import { tailwind4 } from "tailwind-csstree";
import coss from "./eslint-rules/index.mjs";
import policy from "./packages/ui/lint.json" with { type: "json" };

const FONT_WEIGHT = "/\\bfont-(bold|extrabold|black)\\b/";

const asChild = {
  selector: "JSXAttribute[name.name='asChild']",
  message: "Base UI 用 render prop 組合，不用 asChild。",
};

const fontWeight = [
  { selector: `Literal[value=${FONT_WEIGHT}]`, message: "字重只用 400／500／600，不用 font-bold／extrabold／black。" },
  { selector: `TemplateElement[value.raw=${FONT_WEIGHT}]`, message: "字重只用 400／500／600，不用 font-bold／extrabold／black。" },
];

export default defineConfig([
  { ignores: ["**/storybook-static/**", "**/dist/**", "**/node_modules/**", "**/.cache/**"] },
  {
    linterOptions: { noInlineConfig: true },
    plugins: { shadcn, coss },
  },
  {
    files: ["**/*.{ts,tsx,mts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,mjs}"],
    rules: { "coss/no-comments": "error" },
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    languageOptions: { customSyntax: tailwind4, tolerant: true },
    rules: { "coss/no-comments": "error" },
  },
  {
    files: ["apps/storybook/stories/**/*.{ts,tsx}"],
    settings: policy.settings,
    rules: policy.rules,
  },
  ...policy.overrides,
  {
    files: ["apps/storybook/stories/foundations/*.stories.tsx"],
    rules: { "shadcn/no-arbitrary-values": "off", "shadcn/no-inline-styles": "off" },
  },
  {
    files: ["apps/storybook/stories/navigation-menu.stories.tsx"],
    rules: { "shadcn/require-static-classes": "off" },
  },
  {
    files: ["apps/storybook/stories/**/*.tsx"],
    rules: { "coss/menu-label-in-group": "error" },
  },
  {
    files: ["packages/ui/src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": ["error", asChild, ...fontWeight],
      "no-restricted-imports": [
        "error",
        {
          paths: [{ name: "cn", message: "改用 @/lib/utils 的 cn。" }],
          patterns: [
            { group: ["./*", "../*"], message: "組件內部 import 一律用 @/…。" },
            { group: ["@radix-ui/*", "radix-ui"], message: "組件是 Base UI，不是 Radix。" },
          ],
        },
      ],
    },
  },
  {
    files: ["apps/storybook/stories/*.stories.tsx"],
    rules: {
      "no-restricted-syntax": ["error", asChild],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/*", "**/packages/ui/**"], message: "story 以消費端路徑 import：@coss-app/ui/components/<name>。" },
          ],
        },
      ],
    },
  },
]);
