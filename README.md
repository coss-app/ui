# @coss-app/ui

coss 公司通用 UI 組件庫（shadcn/ui + Tailwind v4），以私有 npm 套件發佈到 GitHub Packages。

## 安裝（消費端專案）

專案根目錄 `.npmrc`：

```ini
@coss-app:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```bash
export NODE_AUTH_TOKEN=<具 read:packages 權限的 GitHub PAT>
npm install @coss-app/ui
```

全域 CSS（Tailwind v4 專案，Vite 需搭配 `@tailwindcss/vite`）：

```css
@import "@coss-app/ui/globals.css";
```

使用：

```tsx
import { Button } from "@coss-app/ui/components/button";
import { cn } from "@coss-app/ui/lib/utils";
```

Next.js 不需要 `transpilePackages`（發佈內容已是編譯後的 JS，保留 `"use client"`）。

組件底層是 **Base UI**（shadcn `base-nova` 風格），不是 Radix：
要換掉渲染元素用 `render`，不是 `asChild`。

```tsx
<Button render={<a href="/tickets" />}>工單列表</Button>
```

字體：globals.css 的 `--font-sans` 會先找 `var(--font-sans)`（例如 next/font 設定的 Inter），再退回 PingFang TC／Microsoft JhengHei。

視覺規範見 [DESIGN.md](./DESIGN.md)；色彩 token 全部定義在 `packages/ui/src/styles/globals.css`。

## 開發

```bash
npm install
npm run typecheck
npm run build        # tsc + tsc-alias → packages/ui/dist
npm run storybook    # 瀏覽全部組件：http://localhost:6006
```

新增／更新組件：`cd packages/ui && npx shadcn@latest add <name> --overwrite`，之後：

1. 把 `from "cn"` 改成 `from "@/lib/utils"`（shadcn CLI 會把 `cn` 加成 npm 依賴，請一併移除）。
2. 依 DESIGN.md 把預設 class 換成本專案 token（`bg-muted` 輸入框、`shadow-menu` 浮層、`bg-info` 選中等）。`--overwrite` 會蓋掉已調整過的樣式，更新前先看 diff。

## 發佈

1. 功能 PR 附上 `npx changeset`（記錄這次改了什麼、版本要升 patch／minor）。PR 會跑 CI 並部署文件站預覽。
2. 要發版時，從最新的 main 開分支跑版本：

   ```bash
   git switch main && git pull
   git switch -c release/v0.2.0
   npx changeset version   # 依累積的 changeset 升版號、寫 CHANGELOG
   npm install             # 更新 package-lock.json
   git commit -am "chore: release v0.2.0"
   git push -u origin HEAD && gh pr create --fill
   ```

3. CI 通過後合併 → 自動發佈到 GitHub Packages、打 tag、建立 GitHub Release，並更新 ui.coss.com.tw。

main 上的版本號已經發佈過時，Release workflow 會直接略過，所以平常合併功能 PR 不會發版。

> GitHub Packages 的 scope 必須等於 GitHub org 名稱（`coss-app`），所以套件名是 `@coss-app/ui`；repo 為 `coss-app/ui`。
