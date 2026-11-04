# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案

`@coss-app/ui`：coss 公司 React 組件庫，shadcn/ui **Base UI 版 base-nova**＋Tailwind v4，發佈到 GitHub Packages（私有）。文件站 Storybook 在 https://ui.coss.com.tw（Cloudflare Pages 專案 `coss-ui`）。repo `coss-app/ui`。視覺規範 `DESIGN.md`。

npm workspaces：

- `packages/ui` → `@coss-app/ui`（發佈的套件）
- `apps/storybook` → `@coss-app/docs`（private，文件站）。勿改回 `storybook`：與 npm 套件 `storybook` 同名，`changeset version` 誤判依賴版本。

## 指令

```bash
npm install                              # 不需要 NODE_AUTH_TOKEN（workspace 直接用原始碼）
npm run storybook                        # http://localhost:6006
npm run typecheck                        # 只檢查 packages/ui
npm run typecheck -w @coss-app/docs      # stories / .storybook / MDX 的型別
npm run build                            # packages/ui → dist
npm run build-storybook                  # 文件站靜態檔＋改寫 <title>
```

無測試、無 lint。驗證 = 兩個 typecheck＋`build`＋`build-storybook`；CI 跑前三項。UI 改動在 Storybook 實看淺／深色。

## 套件（packages/ui）

- 建置：`tsc` → `tsc-alias` 把 `@/` 轉相對路徑 → 複製 `src/styles` 到 `dist`。`exports`：`./components/*` → `dist/components/ui/*`，另有 `./lib/*`、`./hooks/*`、`./globals.css`。組件內部 import 一律 `@/…`。
- `src/styles/globals.css` 是唯一 token 來源（根目錄無 globals.css）：
  - `@source "../components"` 勿刪：消費端 Tailwind 靠它掃描 dist 內 class。
  - `--font-sans: var(--font-sans, "Inter"), …` 須帶後備值：未注入時自我參照成循環，整條 font-family 失效退回襯線字。
  - 減少動態規則依賴 Base UI 的 `data-slot`／`data-starting-style`／`data-ending-style`（sheet-content、drawer-popup、toast）。
  - 新增色彩 token 須同時寫 `:root`、`.dark`、`@theme inline` 三處。
- 組件是 Base UI，非 Radix：組合用 `render` prop，不用 `asChild`；需 Slot 行為用 `@base-ui/react/use-render`（見 `form.tsx` 的 `FormControl`）。Menu 的 `*Label` 須放在 `*Group` 內。

### shadcn CLI

在 `packages/ui` 執行 `npx shadcn@latest add <name>` 之後必做：

1. `from "cn"` 改成 `from "@/lib/utils"`，並從 `package.json` 移除 CLI 自動加的 `cn` 依賴。
2. `--overwrite` 會蓋掉已依 DESIGN.md 調整的 class：先看 diff，再重套樣式。

## 文件站（apps/storybook）

- story 一律以消費端路徑 import：`@coss-app/ui/components/<name>`。`.storybook/main.ts` alias 與 `tsconfig.json` paths 把它導回 `packages/ui/src`，兩處須同步。
- `.storybook/docs-page.tsx`：組件 Docs 頁頂端「引用方式」由 story 檔名推出組件檔，再解析組件檔尾 `export { … }` 自動產生。故新組件檔須保留檔尾 export 區塊，story 檔名須與組件檔名相同（`button.stories.tsx` ↔ `button.tsx`）。
- 使用手冊在 `stories/docs/*.mdx`：標題前綴「使用手冊/」，排序寫在 `preview.tsx` 的 `storySort`；MDX 表格靠 `remark-gfm`。手冊與 story 內容用繁體中文、客服工單情境。
- 品牌：`manager.ts`（主題、logo、分頁標題把寫死的「⋅ Storybook」換成「⋅ coss UI」）、`manager-head.html`（favicon、og）、`scripts/rebrand-html.mjs`（建置後改寫 `index.html` 的 `<title>`，找不到即建置失敗）。靜態檔放 `public/`（含 Cloudflare `_headers`）。

## 發版與部署

- main 受保護：須走 PR 且 `ci` 檢查通過。repo 不允許 Actions 開 PR，故**不用 `changesets/action`**。
- 流程：功能 PR 附 `npx changeset` → 要發版時開分支跑 `npx changeset version && npm install`，以 PR 合併。
- `.github/workflows/release.yml`：main 上 `packages/ui/package.json` 版本尚未發佈 → `changeset publish`、推 tag `@coss-app/ui@x.y.z`、建 GitHub Release（取 CHANGELOG 該版段落）、部署正式文件站；已發佈則略過。
- `docs.yml`：PR 部署預覽並留言網址；`workflow_dispatch` 部署正式站。正式站僅在發佈新版或手動觸發時更新，合併 PR 不會自動更新。
- repo secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`；發佈用內建 `GITHUB_TOKEN`。
