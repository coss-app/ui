- 代碼庫是你的，永遠由你開發與維護。
- 每次犯錯，有優先寫成 lint rule；再用測試，自己驗收。
- 嚴禁在代碼寫任何註釋。

## 專案

`@coss-app/ui`：coss 公司 React 組件庫，shadcn/ui **Base UI 版 base-nova**＋Tailwind v4，發佈到 npmjs（公開，MIT；repo 也是公開）。文件站（Storybook）https://ui.coss.com.tw。視覺規範 `DESIGN.md`。

npm workspaces：`packages/ui` → `@coss-app/ui`（發佈套件）；`apps/storybook` → `@coss-app/docs`（private；勿命名為 `storybook`：與 npm 套件同名，`changeset version` 誤判依賴版本）。

## 指令

```bash
npm install
npm run storybook          # http://localhost:6006
npm run verify             # typecheck ×2、lint、test、manifest --check、check:deps、check:shadcn-css、check:patterns
npm run build              # packages/ui → dist
npm run build-storybook
```

CI = `build` ＋ `verify`。hook 已自動執行：改檔後對該檔跑 lint、結束前（檔案有變動時）跑 `verify`；UI 改動另在 Storybook 實看淺／深色。

## 架構

- `packages/ui` 建置：`tsc` → `tsc-alias` → 複製 `src/styles`；`exports` 見其 `package.json`。`src/styles/globals.css` 是唯一 token 來源（token 說明在 `scripts/token-notes.json`）。
- 組件是 Base UI，非 Radix：組合用 `render` prop；需 Slot 行為用 `@base-ui/react/use-render`（見 `form.tsx` 的 `FormControl`）。
- `packages/ui/lint.json` 隨套件發佈給消費端的 `@shadcn/lint`；repo 內部規則在 `eslint.config.mjs` 與 `eslint-rules/`。
- `plugins/coss-ui`：給其他 coss 專案 AI agent 用的 skill。

## 規則（`.claude/rules/`，依編輯路徑按需載入）

`ui-component-styles` 組件樣式｜`globals-css` token｜`storybook`、`storybook-branding` 文件站｜`shadcn-cli` 加組件｜`claude-code-skill` skill 維護｜`release` 發版部署
