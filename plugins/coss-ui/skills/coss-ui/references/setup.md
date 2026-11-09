# 安裝與設定

完整圖文手冊在文件站「使用手冊」：https://ui.coss.com.tw 。這裡只留 agent 動手時需要的步驟。

## 前置

| 項目 | 版本 |
| --- | --- |
| Node.js | 22 以上 |
| React | 18.2 或 19 |
| Tailwind CSS | v4（v3 專案要先升級，見下方「舊專案遷移」） |

`@coss-app/ui` 是 npmjs 的公開套件，**安裝不需要 token 也不需要 `.npmrc`**：`npm install @coss-app/ui`。

## 安裝失敗（401／404）

以前用過 GitHub Packages 版本的專案，`.npmrc` 可能還留著下面兩行，會讓 npm 往 GitHub Packages 找套件。**刪掉這兩行**（檔案只剩這兩行就整個刪掉），再 `npm install @coss-app/ui@latest`；CI、Vercel、Cloudflare、Docker 的 `NODE_AUTH_TOKEN`、`packages: read` 設定也一併移除：

```ini
@coss-app:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## 新專案

### Next.js（App Router，建議）

```bash
npx create-next-app@latest my-app --typescript --tailwind --app --eslint
cd my-app
npm install @coss-app/ui next-themes
```

`app/globals.css` 整個換成：

```css
@import "@coss-app/ui/globals.css";

/* 專案自己的樣式寫在下面 */
```

`app/layout.tsx`：

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@coss-app/ui/components/toast";
import { TooltipProvider } from "@coss-app/ui/components/tooltip";
import "./globals.css";

// variable 必須是 --font-sans：globals.css 用它當主要字體，中文自動退回 PingFang TC／微軟正黑體
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = { title: "My App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <Toaster>{children}</Toaster>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- 組件已標記 `"use client"`，可直接在 Server Component 渲染；傳事件處理函式時，呼叫端才需要是 Client Component。
- 不需要 `transpilePackages`，套件發佈的是編譯好的 JS。

### Vite＋React

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @coss-app/ui
npm install -D tailwindcss @tailwindcss/vite
```

`vite.config.ts` 加入 `tailwindcss()` plugin（`import tailwindcss from "@tailwindcss/vite"`），`src/index.css` 整個換成 `@import "@coss-app/ui/globals.css";`。字體沒設定 `--font-sans` 時會找名為 `Inter` 的字型，沒載入就退回中文系統字；要載入 Inter，在 `index.html` 加 Google Fonts 的 `<link>`（權重 400;500;600）。`src/main.tsx` 以 `TooltipProvider`、`Toaster` 包住 `<App />`；深色模式在 `<html>` 加 `class="dark"`。

## 設計規範 lint（@shadcn/lint）

使用者版說明在文件站「使用手冊／設計規範 Lint」（https://ui.coss.com.tw）。

`@coss-app/ui/lint.json`（0.2.0 起隨套件發佈）是給 [`@shadcn/lint`](https://github.com/shadcn-ui/lint) 用的規則：`className` 只放版面、顏色只用語意 token、不寫任意值。違規訊息會列出組件實際有的 variant／size。需要 Node 20.19+、ESLint 9.30+（或 Oxlint 1.80+）。

### ESLint（Next.js 預設就有 ESLint）

```bash
npm i -D -E @shadcn/lint@0.2.5
npm i -D eslint @typescript-eslint/parser
```

**合併進專案既有的 `eslint.config.mjs`**（保留 `create-next-app` 的 `eslint-config-next`），不要整份覆蓋。加一個設定物件：

```js
import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";
import policy from "@coss-app/ui/lint.json" with { type: "json" };

// 放進 defineConfig([...]) 或匯出的陣列
{
  files: ["**/*.{js,jsx,ts,tsx}"],
  languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true } } },
  plugins: { shadcn },
  settings: policy.settings,
  rules: policy.rules,
}
```

`package.json` 加 `"lint": "eslint ."`（Next.js 16 起 `next lint` 已移除，用 `eslint .`）。

### Oxlint

`.oxlintrc.json`：

```json
{
  "jsPlugins": ["@shadcn/lint"],
  "extends": ["./node_modules/@coss-app/ui/lint.json"],
  "settings": {
    "shadcn": {
      "ui": "@coss-app/ui/components",
      "themeImports": ["^@coss-app/ui/"]
    }
  }
}
```

Oxlint 的 `extends` 不繼承 `settings`，所以 `settings` 要自己寫一份（上面就是 `lint.json` 的內容）。

### 之後

- 在專案的 `AGENTS.md`／`CLAUDE.md` 加一行：「改完跑 `npm run lint`，修到零錯誤」。
- `themeImports` 少了就會把 `bg-primary` 當成未宣告的顏色；若看到整批 token 被誤報，先檢查它。
- 錯誤出現 `This project's cn is …` 的提示只是資訊，不影響結果。
- 引用組件匯出的樣式函式（如 `navigationMenuTriggerStyle()`）會被 `require-static-classes` 回報；那是官方用法，在該行加 `eslint-disable-next-line shadcn/require-static-classes -- 原因`。
- `lint.json` 與 `check-usage.mjs` 互補：lint 管組件的 `className` 與顏色；`check-usage.mjs` 另外抓 `asChild`、`data-[state=…]`、本地 `@/components/ui/` import（沒裝 ESLint 的專案也能跑）。

## 深色模式

`<html class="dark">` 即切換。Next.js 用 `next-themes`（`attribute="class"`）。`dark:` 前綴跟著 `.dark` class 走。

## 微調 token

在 import 之後覆寫變數即可，不改套件：

```css
@import "@coss-app/ui/globals.css";

:root {
  --radius: 0.5rem; /* 全站圓角基準 */
}
```

不要改 `--primary` 等品牌色，會偏離公司規範。需要新顏色，請到 coss-app/ui 提出，統一加進套件。

## 舊專案遷移（shadcn Radix 版 → @coss-app/ui）

1. Tailwind 必須是 v4。
2. `npm install @coss-app/ui`，全域 CSS 換成 `@import "@coss-app/ui/globals.css";`。
3. 逐一把 `@/components/ui/xxx` 的 import 改成 `@coss-app/ui/components/xxx`，確認沒有引用後刪除本地副本。
4. 依下表改 Radix 寫法：

| 舊寫法（Radix） | 新寫法（Base UI） |
| --- | --- |
| `<Button asChild><a href="/x">…</a></Button>` | `<Button render={<a href="/x" />}>…</Button>` |
| `<DialogTrigger asChild><Button>開啟</Button></DialogTrigger>` | `<DialogTrigger render={<Button />}>開啟</DialogTrigger>` |
| `DropdownMenuLabel` 可單獨放 | 必須放在 `DropdownMenuGroup` 內（ContextMenu、Menubar 同理） |
| `<Accordion type="single" collapsible>` | 預設單一展開；多個用 `<Accordion multiple>` |
| `SelectValue` 自動顯示選項文字 | 在 `Select` 傳 `items` |
| Drawer（vaul）`direction="right"` | `swipeDirection="right"` |
| sonner `toast("…")` | 仍可用 `components/sonner`；新程式用 `components/toast` 的 `toast.add({ title })` |
| 選擇器 `data-[state=open]`、`data-[state=checked]` | `data-open`、`data-checked` |

5. 檢查：`npm run build` 通過；深色模式正常；next/font 的 `variable` 為 `"--font-sans"`；刪掉 `@radix-ui/*`、`radix-ui`、`vaul`、`tailwindcss-animate` 與本地 `components.json`。
