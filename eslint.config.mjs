// 只用來檢查 apps/storybook/stories：驗證隨套件發佈的 lint 規則不會誤判官方示範寫法
import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import policy from "./packages/ui/lint.json" with { type: "json" };

export default defineConfig([
  { ignores: ["**/storybook-static/**", "**/dist/**", "**/node_modules/**"] },
  {
    files: ["apps/storybook/stories/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { shadcn },
    settings: policy.settings,
    rules: policy.rules,
  },
  ...policy.overrides,
]);
