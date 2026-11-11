# 組件選型

兩個組件都像時照此決定。組件 import 見 [components.md](components.md)。

## 浮層：Dialog／AlertDialog／Sheet／Drawer／Popover

| 情境 | 用 | 備註 |
| --- | --- | --- |
| 桌面一般任務（轉派工單、編輯資料） | `Dialog` | 置中、25px 圓角；點遮罩或 ✕ 關閉 |
| 不可復原的動作（刪除、離開未存檔） | `AlertDialog` | 點遮罩不關閉，須按確認或取消。可復原的動作不用它（見 [ux-rules.md](ux-rules.md)「其他浮層規則」） |
| 從邊緣滑入的長內容（工單詳情、篩選條件、編輯面板） | `Sheet` | 桌面優先；`side` 指定邊 |
| 手機底部面板、手勢拖曳關閉 | `Drawer` | 手機優先；方向用 `swipeDirection`（不是 vaul 的 `direction`） |
| 貼著觸發元素的小面板（篩選、日期、快速表單） | `Popover` | 手機不留 popover，改 `Drawer` |
| 滑過預覽（客戶資料摘要） | `HoverCard` | 只有滑鼠看得到，不放必要資訊 |
| 一句提示文字 | `Tooltip` | 只補充說明；圖示鈕一定要有 `aria-label` |

桌面 `Dialog`、手機 `Drawer`（確認框、下拉、日期、選單同理）；用 `useIsMobile()` 切換，內容抽成共用組件；長表單手機改整頁。完整規則見 [ux-rules.md](ux-rules.md)「2. 浮層與選擇器」。

## 下拉選擇：Select／NativeSelect／Combobox／Command／DropdownMenu

| 情境 | 用 |
| --- | --- |
| 一般下拉選值 | `Select`（Root 傳 `items`；手機自動改法見 ux-rules） |
| 不引入 Drawer 的簡單表單、要原生手機選擇器 | `NativeSelect`（簡易替代，非首選） |
| 選項多、需搜尋或可多選（標籤、負責人） | `Combobox`（多選用 `ComboboxChips`） |
| 全域搜尋、跳頁、執行指令（Cmd+K） | `Command`（`CommandDialog`） |
| 點一下出現「動作」清單（更多動作、轉派、刪除） | `DropdownMenu`（不是 Select） |
| 右鍵快速動作 | `ContextMenu` |
| 桌面應用式橫向選單列 | `Menubar`（很少需要） |

`Select` 選「值」，`DropdownMenu` 觸發「動作」，不互換。

## 表單：Field／Form／Input 家族

- 簡單表單：`FieldSet`＋`FieldGroup`＋`Field`（`FieldLabel`、`FieldDescription`、`FieldError`），自己管狀態。
- 要驗證與錯誤顯示：`Form`＋`FormField`＋`FormItem`＋`FormControl`＋`FormMessage`（react-hook-form＋zod），範本見 [patterns.md](patterns.md)。
- 同一表單不混用 `Field` 與 `Form`。

| 輸入 | 用 |
| --- | --- |
| 單行文字 | `Input` |
| 前後有圖示、文字或按鈕（搜尋框、金額、單位） | `InputGroup`＋`InputGroupInput`＋`InputGroupAddon` |
| 多行文字 | `Textarea`（要前後綴用 `InputGroupTextarea`） |
| 驗證碼 | `InputOTP` |
| 日期 | `Popover`＋`Calendar`（手機 `Drawer`） |
| 單一布林、按送出才生效 | `Checkbox` |
| 單一布林、切換立即生效（啟用通知） | `Switch` |
| 多選一且要全部看得到 | `RadioGroup`（> 6–7 個改 `Select`） |
| 可複選 | ≤ 5–6 個：多個 `Checkbox` 直接列在頁面；更多：`Combobox` 多選（手機行為見 ux-rules） |
| 數值範圍 | `Slider` |
| 按鈕式切換（檢視模式、篩選） | `ToggleGroup`（單顆用 `Toggle`） |
| 分步問答、滿意度調查 | `Questionnaire` |

## 回饋：Alert／Toast／Sonner／Progress／Spinner／Skeleton

| 情境 | 用 |
| --- | --- |
| 頁面內持續存在的提示（系統維護、欄位區塊說明） | `Alert` |
| 操作後的短暫通知（已儲存、已複製） | `Toast`（`toast.add({ title, type })`） |
| 非同步操作 loading → 成功／失敗 | `Toast` 的 promise 用法 |
| 已有 Sonner 的舊專案 | `Sonner`（`toast.success(...)`） |
| 知道百分比的進度 | `Progress` |
| 不知道多久（送出中、按鈕內） | `Spinner`（按鈕內加 `data-icon="inline-start"`） |
| 內容載入中的版面佔位 | `Skeleton` |

- Toast 與 Sonner 二擇一；一個專案只掛一個 `Toaster`（兩個檔案都叫 `Toaster`）。新專案用 `components/toast`，`<Toaster>` 包住 `children`。
- 要使用者「回頭還能看到」用 `Alert`；操作回饋用 `Toast`。
- `Skeleton`／`Spinner` 的出現時機見 [ux-rules.md](ux-rules.md)「9. 載入、回饋與錯誤狀態」。

## 導覽：Sidebar／NavigationMenu／Tabs／Breadcrumb／Pagination

| 情境 | 用 |
| --- | --- |
| 後台主導覽（左側欄，目前頁面淡綠底） | `Sidebar`（`SidebarProvider`＋`SidebarInset`；手機自動變抽屜） |
| 對外網站頂部導覽（含展開選單） | `NavigationMenu` |
| 同頁內切換並列內容（全部／待受理／已結案） | `Tabs` |
| 顯示目前層級位置 | `Breadcrumb` |
| 表格分頁 | `Pagination`（`PaginationInfo` 顯示筆數） |
| 輪播、橫向滑動卡片 | `Carousel` |

`Tabs` 切同層內容，不換頁；換頁用連結（`render` 搭配框架的 `Link`）。

## 內容容器：Card／Item／Table／Empty／Accordion／Collapsible

| 情境 | 用 |
| --- | --- |
| 有標題的白色面板 | `Card` |
| 清單中的一列（頭像／圖示＋標題＋說明＋動作），如設定列、聯絡人 | `Item`（比 Card 輕；不把每列包成 Card） |
| 多欄、可比較的資料、需表頭 | `Table`；手機改卡片列表 |
| 沒有資料、搜尋無結果、尚未建立 | `Empty`（放在表格或面板內，附一個行動按鈕） |
| 多段內容、一次看一段（FAQ、詳情分區） | `Accordion`（多段同時展開用 `multiple`） |
| 單一區塊展開／收合 | `Collapsible` |
| 步驟式處理紀錄、可展開細節 | `Trace` |
| 標籤、狀態 | `Badge` |
| 頭像、頭像群組 | `Avatar`、`AvatarGroup` |
| 鍵盤快捷鍵 | `Kbd` |
| 程式碼、錯誤輸出 | `CodeBlock` |
| 圖表 | `ChartContainer`（Recharts） |

## 對話：Message／Bubble／Attachment／MessageScroller／Marker

結構（由外到內）：

```
MessageScrollerProvider > MessageScroller > MessageScrollerViewport > MessageScrollerContent
  └ MessageScrollerItem（每則一個，帶 messageId；`scrollAnchor` 標在「新進來時要捲到視窗頂端」的訊息，通常是使用者剛送出的那一則）
      └ Message（align="start|end" 決定左右）
          └ MessageContent > MessageHeader / Bubble > BubbleContent / MessageFooter
```

- 訊息捲動、新訊息自動到底、回到底部按鈕：`MessageScroller`。
- 客戶訊息 `Bubble variant="secondary"`、客服回覆 `default`；`align` 與 `Message` 的 `align` 一致。
- 附件放在對話或輸入區：`Attachment`（含上傳中、失敗、重試狀態）。
- 日期分隔、「以下為新訊息」：`Marker variant="separator"`。

## 版面工具

| 需求 | 用 |
| --- | --- |
| 可拖曳調整寬度的分割（清單｜內容） | `Resizable` |
| 固定高度內捲動 | `ScrollArea` |
| 分隔線 | `Separator` |
| 固定寬高比（圖片、影片） | `AspectRatio` |
| 閱讀方向（RTL） | `DirectionProvider`（一般用不到） |
