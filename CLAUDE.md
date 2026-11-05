# CLAUDE.md

## 專案

`@coss-app/ui`：coss 公司 React 組件庫，shadcn/ui **Base UI 版 base-nova**＋Tailwind v4，發佈到 GitHub Packages（私有）。文件站（Storybook）https://ui.coss.com.tw，Cloudflare Pages 專案 `coss-ui`。repo `coss-app/ui`。視覺規範 `DESIGN.md`。

npm workspaces：

- `packages/ui` → `@coss-app/ui`（發佈套件）
- `apps/storybook` → `@coss-app/docs`（private，文件站）。勿命名為 `storybook`：與 npm 套件 `storybook` 同名，`changeset version` 誤判依賴版本。

## 指令

```bash
npm install                              # 不需要 NODE_AUTH_TOKEN（workspace 直接用原始碼）
npm run storybook                        # http://localhost:6006
npm run typecheck                        # 只檢查 packages/ui
npm run typecheck -w @coss-app/docs      # stories / .storybook / MDX 的型別
npm run build                            # packages/ui → dist
npm run build-storybook                  # 文件站靜態檔＋改寫 <title>
```

無測試、無 lint。驗證 = 兩個 typecheck＋`build`＋`build-storybook`；CI 跑前三項＋`npm run manifest -- --check`。UI 改動在 Storybook 實看淺／深色。

## 套件（packages/ui）

- 建置：`tsc` → `tsc-alias` 把 `@/` 轉相對路徑 → 複製 `src/styles` 到 `dist`。`exports`：`./components/*` → `dist/components/ui/*`，另有 `./lib/*`、`./hooks/*`、`./globals.css`。組件內部 import 一律 `@/…`。
- `src/styles/globals.css` 是唯一 token 來源（根目錄無 globals.css）。
- 組件是 Base UI，非 Radix：組合用 `render` prop，不用 `asChild`；需 Slot 行為用 `@base-ui/react/use-render`（見 `form.tsx` 的 `FormControl`）。Menu 的 `*Label` 須放在 `*Group` 內。

### shadcn CLI

在 `packages/ui` 執行 `npx shadcn@latest add <name>` 之後必做：

1. `from "cn"` 改成 `from "@/lib/utils"`，並從 `package.json` 移除 CLI 自動加的 `cn` 依賴。
2. `--overwrite` 會蓋掉已依 DESIGN.md 調整的 class：先看 diff，再重套樣式。

## 文件站（apps/storybook）

- story 一律以消費端路徑 import：`@coss-app/ui/components/<name>`。`.storybook/main.ts` alias 與 `tsconfig.json` paths 導回 `packages/ui/src`，兩處須同步。
- `.storybook/docs-page.tsx`：組件 Docs 頁頂端「引用方式」由 story 檔名推出組件檔，再解析組件檔尾 `export { … }` 自動產生（解析在 `scripts/parse-exports.mjs`，與 skill manifest 共用）。故新組件檔須保留檔尾 export 區塊，story 檔名須與組件檔名相同（`button.stories.tsx` ↔ `button.tsx`）。
- 使用手冊在 `stories/docs/*.mdx`：標題前綴「使用手冊/」，排序寫在 `preview.tsx` 的 `storySort`；MDX 表格靠 `remark-gfm`。手冊與 story 內容用繁體中文、客服工單情境。

## Claude Code skill（plugins/coss-ui）

給「其他 coss 專案」的 AI agent 用。repo 即 plugin marketplace（`.claude-plugin/marketplace.json`，消費端 `/plugin marketplace add coss-app/ui`）。

- `references/components.md`、`tokens.md`、`plugins/coss-ui/manifest.json` 由 `npm run manifest` 產生，勿手改。來源：組件原始碼（匯出、cva variants）、story 的 `meta.title`、`globals.css`。改這些後須重跑；`-- --check` 不同步即失敗，CI 會跑。
- 新增組件：`scripts/component-notes.json` 補一句用途（缺或多都失敗）→ `npm run manifest` → 視需要更新 `decision-guide.md`。新色彩 token 若不屬 `build-manifest.mjs` 的 `TOKEN_GROUPS` 也失敗，補分組。
- 新增 story 分類：同步 `preview.tsx` 的 `storySort` 與 `build-manifest.mjs` 的 `CATEGORY_ORDER`。
- 其餘維護規則（手寫／產生檔清單、`plugin.json` 無 version、`check-usage.mjs`、`patterns.md` 驗證）見 `.claude/rules/claude-code-skill.md`，編輯 `plugins/coss-ui/**`、`scripts/**` 時載入。

## 發版與部署

- main 受保護：須走 PR 且 `ci` 檢查通過。repo 不允許 Actions 開 PR，故**不用 `changesets/action`**。
- 流程：功能 PR 附 `npx changeset` → 要發版時開分支跑 `npx changeset version && npm install && npm run manifest`（manifest 把新版本號寫進 `components.md`／`tokens.md`／`manifest.json`，供判斷專案裝的套件夠不夠新），以 PR 合併。
- `.github/workflows/release.yml`：main 上 `packages/ui/package.json` 版本尚未發佈 → `changeset publish`、推 tag `@coss-app/ui@x.y.z`、建 GitHub Release（取 CHANGELOG 該版段落）；已發佈則略過。
- `docs.yml`：PR 部署預覽並留言網址；push 到 main（`apps/storybook/**`、`packages/ui/**`、`scripts/parse-exports.*`、`package-lock.json` 有變動）與 `workflow_dispatch` 部署正式站。正式站可能領先已發佈版本（含未發版組件）。
- repo secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`；發佈用內建 `GITHUB_TOKEN`。
