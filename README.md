# 🎨 @coss-app/ui

coss 公司的 React 組件庫：65 個組件套好公司設計規範，安裝後直接用。

| 重點        | 說明                                                                             |
| ----------- | -------------------------------------------------------------------------------- |
| 📚 文件站   | [ui.coss.com.tw](https://ui.coss.com.tw) 有每個組件的範例、import 寫法與使用手冊 |
| 🌈 設計規範 | 依 [DESIGN.md](./DESIGN.md) 的靛藍＋品牌綠配色，內建深色模式                     |
| 🧱 技術基礎 | shadcn/ui（Base UI 版）＋ Tailwind CSS v4                                        |
| 📦 公開套件 | 發佈在 npmjs（MIT），安裝不需要 token                                            |

## 🚀 快速開始

```bash
npm install @coss-app/ui
```

全域 CSS 換成這一行（Tailwind v4 專案；Vite 要搭配 `@tailwindcss/vite`）：

```css
@import "@coss-app/ui/globals.css";
```

```tsx
import { Button } from "@coss-app/ui/components/button";
import { cn } from "@coss-app/ui/lib/utils";
```

## 🤖 Claude Code skill

用 Claude Code 寫畫面時，安裝 `coss-ui` skill，讓 AI 知道組件選型、設計規範與 Base UI 寫法：

```text
/plugin marketplace add coss-app/ui
/plugin install coss-ui@coss
```

skill 內容由組件原始碼與 `globals.css` 產生（`npm run manifest`），見 [CLAUDE.md](./CLAUDE.md)。

## 📝 使用須知

| 項目     | 說明                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------- |
| Base UI  | 組件底層是 Base UI，不是 Radix；替換渲染元素用 `render`，不是 `asChild`                                   |
| Next.js  | 不需要 `transpilePackages`，套件是編譯好的 JS 並保留 `"use client"`                                       |
| 字體     | 先用 `--font-sans`（例如 next/font 的 Inter），沒設定時用 `Inter`，再退回 PingFang TC／Microsoft JhengHei |
| 色彩變數 | 全部定義在 `packages/ui/src/styles/globals.css`，專案不需要新增                                           |
| 套件名稱 | npmjs 的 scope 是 `@coss-app`，套件名稱是 `@coss-app/ui`                                                  |

```tsx
<Button render={<a href="/tickets" />}>工單列表</Button>
```

## 📁 專案結構

```text
packages/ui/              # 發佈的套件 @coss-app/ui
  src/components/ui/      # 組件
  src/styles/globals.css  # 色彩變數與全域樣式
  dist/                   # 建置產物（gitignored）
apps/storybook/           # 文件站 ui.coss.com.tw（workspace：@coss-app/docs）
  stories/                # 每個組件一個 *.stories.tsx
  stories/docs/           # 使用手冊（MDX）
  storybook-static/       # 文件站建置產物（gitignored）
plugins/coss-ui/          # Claude Code skill（repo 本身是 plugin marketplace）
.claude-plugin/           # plugin marketplace 設定
.claude/rules/            # 給 Claude Code 讀的專案規則
scripts/                  # skill manifest 產生器、組件用途說明
.changeset/               # 待發佈的版本變更紀錄
.github/workflows/        # CI、文件站部署、發佈
DESIGN.md                 # 設計規範
```

## ⚡ 指令

開發這個 repo 不需要 token，`npm install` 直接用 workspace 原始碼。

| 指令                      | 用途                                              |
| ------------------------- | ------------------------------------------------- |
| `npm install`             | 安裝依賴                                          |
| `npm run storybook`       | 啟動文件站，瀏覽全部組件（http://localhost:6006） |
| `npm run typecheck`       | 型別檢查                                          |
| `npm run build`           | 建置套件到 `packages/ui/dist`                     |
| `npm run build-storybook` | 建置文件站靜態檔                                  |
| `npm run manifest`        | 重新產生 Claude Code skill 的組件索引與 token     |

## 📏 規則

給 Claude Code 讀的專案規則，編輯對應檔案時自動載入；整體說明在 [CLAUDE.md](./CLAUDE.md)。

| 名稱                                                               | 用途                                                                       |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| [`claude-code-skill.md`](./.claude/rules/claude-code-skill.md)     | skill 維護：產生檔勿手改、plugin.json 不設 version、違規檢查腳本、範例驗證 |
| [`globals-css.md`](./.claude/rules/globals-css.md)                 | globals.css 慣例：掃描來源、字體後備值、色彩 token 三處同步                |
| [`storybook-branding.md`](./.claude/rules/storybook-branding.md)   | 文件站品牌：分頁標題、favicon、建置後改寫 `<title>`、靜態檔                |
| [`ui-component-styles.md`](./.claude/rules/ui-component-styles.md) | 組件 class 慣例：輸入框、浮層、選中色、圓角、字重                          |

## 🛠️ 維護

新增或更新組件：

1. 執行 `cd packages/ui && npx shadcn@latest add <name>`；更新既有組件加 `--overwrite`，它會蓋掉已調整的樣式，執行後先看 diff。
2. 把 `from "cn"` 改成 `from "@/lib/utils"`，並移除 shadcn CLI 自動加的 `cn` 依賴。
3. 依 DESIGN.md 換掉預設 class（輸入框 `bg-muted`、浮層 `shadow-menu`、選中 `bg-info` 等）。
4. 在 `scripts/component-notes.json` 補一句用途，執行 `npm run manifest`，連同 `plugins/coss-ui` 一起提交；漏做時 CI 的 `manifest --check` 會失敗。

發佈新版：

1. 功能 PR 附上 `npx changeset`，記錄改了什麼、要升 patch 還是 minor。PR 會跑 CI 並部署文件站預覽，合併後 ui.coss.com.tw 自動更新。
2. 要發版時，從最新的 main 開分支跑版本：

   ```bash
   git switch main && git pull
   git switch -c release/v0.2.0
   npx changeset version   # 依累積的 changeset 升版號、寫 CHANGELOG
   npm install             # 更新 package-lock.json
   npm run manifest        # 更新 skill 內標示的套件版本（否則 CI 的 manifest 檢查會失敗）
   git commit -am "chore: release v0.2.0"
   git push -u origin HEAD && gh pr create --fill
   ```

3. CI 通過後合併，就會自動發佈到 npmjs、打 tag、建立 GitHub Release。

> [!NOTE]
> main 上的版本號已經發佈過時，Release workflow 會直接略過，所以平常合併功能 PR 不會發版；但文件站會更新，可能出現尚未發版的組件。
