---
name: coss-ui
description: 在 React 專案使用 coss 公司組件庫 @coss-app/ui（Base UI 版 shadcn＋Tailwind v4，靛藍＋品牌綠）時使用。凡是要用 @coss-app/ui 建立或修改畫面（後台、客服工單、表單、列表、對話、彈窗、側欄），或專案已有 @coss-app/ui 依賴、import 了 @coss-app/ui/components/*，就套用本 skill。涵蓋 import 路徑、組件選型、設計規範、token、Base UI 與 Radix 的差異、安裝設定。
---

# coss UI（`@coss-app/ui`）

coss 公司通用組件庫：65 個 Base UI 組件＋Tailwind v4＋一份 `globals.css` token。文件站（可操作範例與 props）：https://ui.coss.com.tw

這不是 Radix 版 shadcn。憑 shadcn 的記憶寫會出錯，先照下面的規則。

## 硬規則

1. **import 一律走套件路徑**：`import { Button } from "@coss-app/ui/components/button";`。檔名是 kebab-case（`button-group`、`alert-dialog`）。不從 `@/components/ui/...` 引、不複製組件原始碼到專案、不新增本地同名組件。
2. **全域 CSS 只有一行**：`@import "@coss-app/ui/globals.css";`（已含 tailwindcss，不要再 import 一次）。
3. **Base UI 組合用 `render`，不用 `asChild`**：
   - `<DialogTrigger render={<Button />}>開啟</DialogTrigger>`
   - `<Button render={<a href="/tickets" />}>工單列表</Button>`
4. **選單類的 `*Label` 必須放在 `*Group` 裡**（DropdownMenu、ContextMenu、Menubar 都一樣），單獨放會出錯。
5. **Select 要在 Root 傳 `items`**（`{ value, label }` 陣列）才會在 Trigger 顯示文字，否則顯示的是 value。
6. **調整外觀走 variant／size／`className`**，不改組件原始碼。`className` 只放版面（寬、間距、對齊），不用來改顏色與圓角——那些是設計規範決定的。
7. **顏色只用語意 token class**：`bg-primary`、`text-muted-foreground`、`border-border`。不寫 HEX、不寫 `bg-[#…]`、不用 `bg-gray-500`、`text-black`、`bg-green-500` 這類 Tailwind 預設色。完整清單見 [tokens.md](references/tokens.md)。
8. **按鈕內的圖示**加 `data-icon="inline-start"` 或 `"inline-end"`（內距會自動調整）：`<Button><PlusIcon data-icon="inline-start" />建立工單</Button>`。圖示用 `lucide-react`。
9. **深色模式靠 `<html class="dark">`**，`dark:` 前綴跟著它走。用 token 就不必寫兩套顏色。
10. **樣式自訂的狀態選擇器**是 `data-open`、`data-checked`（Base UI），不是 Radix 的 `data-[state=open]`。

## 設計規範（寫畫面時的判斷）

- **綠色（`primary`）只給主要動作與「目前所在位置」**。一個畫面只放一個主要按鈕（`<Button>` 預設）。次要用 `variant="outline"`，輔助用 `secondary`，列表列上的動作用 `neutral`，圖示鈕用 `ghost`。
- **資訊用藍色**：連結、勾選、選中、處理中。不用綠色表示「選中」。
- **狀態用 Badge／Alert 的 variant**，且一律同時有文字：待受理＝`warning`、處理中＝`info`、已結案／成功＝`success`、逾期／失敗＝`destructive`、分類＝`default`。
- **面板靠底色分層，不加陰影**：`Card` 本身就是白底、10px 圓角。只有浮層（選單、彈窗、Toast）有陰影，組件已內建。
- **字重只用 400／500／600**，不用 `font-bold`。不用純黑文字，內文用 `text-foreground`，次要用 `text-muted-foreground`。
- **輸入框預設沒有框線**，只在聚焦與錯誤時出現；錯誤用 `aria-invalid`，不要手寫紅框。
- **手機優先**：觸控目標至少 40×40，手機上的短彈窗用 `Drawer`／`Sheet`，不是置中 `Dialog`。
- 細節與 DESIGN.md 的取捨見 [design-rules.md](references/design-rules.md)。

## 要找什麼，讀哪份

| 需求 | 讀 |
| --- | --- |
| 有哪些組件、各自 import 與 variant | [components.md](references/components.md)（自動產生） |
| 兩個組件都像，不知選哪個（Dialog／Sheet／Drawer、Select／Combobox…） | [decision-guide.md](references/decision-guide.md) |
| 色彩、圓角、陰影的 token 名稱與值 | [tokens.md](references/tokens.md)（自動產生） |
| 視覺規範：顏色配對、字級、間距、響應式 | [design-rules.md](references/design-rules.md) |
| 可直接套用的整頁範本（工單表單、列表、對話、側欄版面） | [patterns.md](references/patterns.md) |
| 新專案安裝、`.npmrc`、字體、深色模式、舊專案遷移 | [setup.md](references/setup.md) |

某個組件的完整 props 與互動範例，以文件站該組件頁為準：`https://ui.coss.com.tw/?path=/docs/<分類>-<組件>--docs`（連結在 components.md 每個組件下方）。

## 工作方式

1. 先看專案 `package.json` 的 `@coss-app/ui` 版本，與 references 標示的版本比對。專案版本較舊時，新組件可能不存在；import 失敗先檢查這點，不要自己補一個本地組件。
2. 用到不熟的組件，先查 components.md 與 decision-guide.md，再動手。**要精確的 props 與型別**，直接讀專案裡的 `node_modules/@coss-app/ui/dist/components/ui/<檔名>.d.ts`：它一定對得上專案安裝的版本，比文件可靠。
3. 表單：簡單表單用 `Field` 系列；要 zod 驗證、錯誤訊息自動帶出，用 `Form`（react-hook-form）。兩者不混用在同一個表單。
4. 寫完檢查：
   - 跑專案的 typecheck（會抓到 `asChild`、不存在的 variant／prop）。
   - 對改過的檔案或資料夾跑本 skill 的 `scripts/check-usage.mjs`（路徑相對於本 skill 資料夾）：`node <本 skill 資料夾>/scripts/check-usage.mjs src`。它抓型別檢查抓不到的：寫死的 HEX 與 Tailwind 任意色值、預設色票（`gray-600`、`green-500`）、純黑、`font-bold`、`asChild`、`data-[state=…]`、本地 `@/components/ui/` import。有違規就改成語意 token 再重跑；刻意例外才在該行加 `coss-ui-ignore` 註解。
   - 人工確認：`*Label` 在 `*Group` 內、一個畫面只有一個主要按鈕。
5. 組件真的缺功能或有 bug：不要在專案裡複製修改，回報到 coss-app/ui（github.com/coss-app/ui）統一修。

## 文字與情境

介面文字、範例與錯誤訊息用繁體中文（台灣）。範例情境偏客服工單系統（工單、客戶、客服人員、SLA）。
