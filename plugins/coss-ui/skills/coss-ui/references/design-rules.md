# 設計規範（消費端版）

摘自 repo 的 `DESIGN.md` 與組件樣式慣例，只留「寫畫面時會做的決定」。色碼與 token 名稱見 [tokens.md](tokens.md)；組件本身已套好這些規則，這裡講的是你**組合**組件時要遵守的部分。

## 色彩使用

- **品牌綠（`primary`）只出現在兩處**：主要動作按鈕、目前所在位置（側欄選中項、進度）。其他地方保持中性，讓綠色一眼被找到。
- **資訊用藍（`info`）**：連結、勾選、日期選中、處理中。選中狀態不要用綠色。
- **灰階全部帶靛藍調**：用 `foreground`／`muted-foreground`／`placeholder`／`border`，不用 `gray-*`、`slate-*`、`black`。
- **底色與字色成對使用**，不要混搭：
  - `bg-primary` ↔ `text-primary-foreground`（白）
  - `bg-success-muted` ↔ `text-success-foreground`
  - `bg-info-muted` ↔ `text-info-foreground` 或 `text-info`
  - `bg-warning-muted` ↔ `text-warning`
  - `bg-destructive-muted` ↔ `text-destructive-foreground`
  - `bg-muted`／`bg-secondary` ↔ `text-foreground` 或 `text-muted-foreground`
- **對比**：`placeholder` 與 `border-strong` 只用在 placeholder、表頭、次要圖示、停用文字，不放主要資訊。`brand`（鮮亮綠）、`warning-bright`（亮橘）對比不足，不放白字、不單獨當文字色；`star` 只給評分星星。
- **資訊不只靠顏色**：每個狀態同時有文字或圖示（Badge 帶文字、Alert 帶圖示）。

## 按鈕

| 場景 | 用法 |
| --- | --- |
| 頁面層級或彈窗確認 | `<Button>`（預設，膠囊形）。**一個畫面一個**，彈窗內主要按鈕靠右 |
| 卡片內滿寬表單送出 | `<Button size="block">`（10px 圓角） |
| 次要動作（取消、返回） | `variant="outline"` |
| 上傳、附件等輔助動作 | `variant="secondary"` |
| 表格列上的動作 | `variant="neutral"`（小一號、7px 圓角） |
| 圖示鈕、關閉鈕 | `variant="ghost" size="icon"`，必加 `aria-label` |
| 刪除、結束等破壞性動作 | `variant="destructive"` |
| 文字連結式動作 | `variant="link"` |

- **載入中**：按鈕內左側放 `<Spinner data-icon="inline-start" />`，按鈕 `disabled`，文字改進行式（「送出中」「寄送中」），不蓋全頁遮罩。
- **停用**不要自己改色，用 `disabled`，組件會處理（主要鈕換淡綠，其他半透明）。
- 圖示：`data-icon="inline-start"` 放文字前、`inline-end` 放文字後，圖示用 `lucide-react`，不用自訂尺寸。

## 表單

- 標籤在輸入框上方，標籤與輸入框間距 8px（`gap-2`），欄位之間 16–20px（`gap-4`／`gap-5`）。
- 輸入框高 40px、淡霧灰底、**沒有預設框線**；聚焦時才出現框線並轉白底，錯誤時紅框。不要為「看起來像輸入框」自己加 `border`。
- 錯誤用組件的機制：`aria-invalid`＋`FieldError`／`FormMessage`，錯誤文字 14/600 珊瑚色，不要自己拼 `text-red-500`。
- 說明文字用 `FieldDescription`／`FormDescription`，不要放在 placeholder 裡（placeholder 只放範例值）。
- 必要時的送出鈕：送出中顯示 Spinner＋進行式文字並停用。

## 文字

- 字體 Inter＋中文系統字，全站只用這一套，不另外指定 `font-family`。
- **字重只用 400／500／600**：內文 400、標題／按鈕／標籤 600。不用 `font-bold`、`font-extrabold`。
- 字距一律預設（0），不加 `tracking-*`。
- 行高：單行元件 1，多行段落 1.5。

| 層級 | 大小 / 字重 | Tailwind 參考 |
| --- | --- | --- |
| 彈窗標題、詳情頁標題 | 20 / 600 | `text-xl font-semibold` |
| 面板標題 | 18 / 600 | `text-lg font-semibold` |
| 對話內文、空狀態說明 | 16 / 400 | `text-base` |
| 一般內文、輸入、表格內容 | 14 / 400 | `text-sm` |
| 標籤、表單 label、側欄分組標題 | 13 / 600 | `text-[13px] font-semibold` |
| 中繼資料、訊息時間 | 13 / 400 | `text-[13px] text-muted-foreground` |
| 表頭、時間戳記 | 12 / 400 | `text-xs text-placeholder` |

標題與大標用 `text-heading`（比內文更深一階）。

## 圓角、間距、陰影

- **圓角階層**：勾選框 5、中性按鈕 7、面板／輸入框／選單／提示列 10、彈窗與統計卡 25、膠囊給主要／次要按鈕與分頁籤。組件都已內建，自己的容器用 `rounded-lg`（10px），不要隨意換值。
- **間距以 4px 為單位**，常用 4／8／10／16／20／30。面板內距 20（`p-5`）、彈窗內距 30、側欄左右 16。
- **陰影**：一般面板不加陰影，靠 `bg-background`（底）與 `bg-card`（白色面板）的明度差分層。只有浮在內容上的東西（選單、彈窗、Toast）有陰影，且組件已內建；自己做的浮層用 `shadow-menu`／`shadow-float`。
- 不替輸入框加預設框線，不替一般面板加外框。
- **`className` 的範圍**：有 variant 的組件（Button、Badge、Alert、Input…）只放版面，外觀換 variant／size；其他組件可加排版、語意文字色、`gap-*`；容器類（Card*、ScrollArea、Command、Empty…）可再加內距、邊框、圓角、底色。範圍由 `@coss-app/ui/lint.json` 的 contracts 定義。

## 版面

- **App 外框**：左側欄 260px＋頂列 60px（晨霧白底）＋白色內容面板，面板四周留 16px。
- **列表頁**：面板標題列 → 篩選列（下拉、搜尋靠右）→ 表格 → 底部分頁。
- **三欄詳情**：清單約 280px｜內容｜屬性約 260–300px，欄間用 `border` 分隔。
- **窄螢幕（mobile-first，先做手機）**：斷點 768／1024。

| 版面 | 桌面 | 手機（< 768） |
| --- | --- | --- |
| 側欄 | 固定 260 | 收成抽屜（`Sidebar` 自動處理） |
| 內容面板 | 四周 16、內距 20 | 滿版、圓角歸零、內距 16 |
| 表格 | 表格＋篩選列 | 卡片列表；篩選收進「篩選」底部面板 |
| 彈窗 | 置中 `Dialog` | 短彈窗用底部 `Drawer`／`Sheet`，主要按鈕固定底部；長表單改整頁 |
| 下拉、日期 | 浮動面板 | 底部面板，選項列高 48px |
| Toast | 左下角 | 底部置中，左右各留 16px |

- 觸控目標至少 40×40px；手機上的選項列 48px。
- 驗收寬度：375、768、1024、1440，再加真機。

## 動態

- 使用者剛做的選擇（分頁籤、篩選）立即生效，不等伺服器；失敗時回彈。
- 載入超過 200ms 才換成骨架（保留舊內容），骨架出現後至少停 400ms，避免一閃而過。
- 換頁轉場只做進場（桌面淡入 200ms）；自己寫的動畫曲線用 `ease-out`（套件已把它調成較強的曲線）。
- 減少動態偏好已由 `globals.css` 處理，不需要另外寫。

## Do／Don't

**Do**

- 文字用 `foreground` 階，底色用 `background`／`card` 的明度差分層。
- 綠色只給主要動作與目前位置；連結、勾選、進度用資訊藍。
- 主要動作膠囊形，容器 10px，大型容器 20–25px。
- 每個狀態同時給顏色與文字／圖示。

**Don't**

- 不用純黑文字、不用無藍調的中性灰、不用 Bold 700。
- 不替一般面板加陰影、不替輸入框加預設框線。
- 不把星等黃、亮橘當狀態色或文字色。
- 不在綠色以外的元素做「主要」強調；一個畫面只放一個主要動作鈕。
- 不寫 HEX 或 Tailwind 預設色（`bg-green-500`、`text-gray-600`），一律用 token。
