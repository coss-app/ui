<!-- 由 scripts/build-manifest.mjs 產生，請勿手改。改組件、story、globals.css 或 component-notes.json 後執行 npm run manifest。 -->

# coss UI token

對應 `@coss-app/ui` **0.2.0**。來源是 `globals.css`（唯一 token 來源），消費端引入 `@coss-app/ui/globals.css` 即得到全部。

寫 class 時只用語意名稱，不寫 HEX 或任意值（如 `bg-[#00a756]`）：深色模式由 token 自動切換。
「Utility」欄的名稱可搭配 `bg-`、`text-`、`border-`、`ring-`、`fill-` 等色彩前綴，例如 `bg-primary`、`text-muted-foreground`、`border-border`。

## 表面與文字

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `background` | `#f7f8fe` | `#0e1124` | grey 10：App 底色 |
| `foreground` | `#2d336b` | `#e4e7f7` | grey default：內文 |
| `heading` | `#222962` | `#f3f4fc` | grey 80：大標 |
| `card` | `#ffffff` | `#171b36` |  |
| `card-foreground` | `#2d336b` | `#e4e7f7` |  |
| `popover` | `#ffffff` | `#1c2140` |  |
| `popover-foreground` | `#2d336b` | `#e4e7f7` |  |

## 品牌與主要動作

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `primary` | `#00a756` | `#00a756` | primary dark：主要按鈕 |
| `primary-foreground` | `#ffffff` | `#ffffff` |  |
| `primary-hover` | `#008746` | `#008746` | 主要按鈕 hover |
| `primary-disabled` | `#80d3ab` | `#0c6146` | 主要按鈕停用 |
| `brand` | `#07ce6f` | `#3ddc8e` | primary default：進度、狀態點 |

## 中性與邊框

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `secondary` | `#eff0f8` | `#232845` | grey 20 |
| `secondary-foreground` | `#2d336b` | `#e4e7f7` |  |
| `muted` | `#eff0f8` | `#232845` | grey 20：輸入框填色 |
| `muted-foreground` | `#5566a4` | `#9aa3cf` | grey 60：次要文字 |
| `placeholder` | `#8f9bc8` | `#6f79a8` | grey 50 |
| `accent` | `#eff0f8` | `#262c4e` | hover 底 |
| `accent-foreground` | `#2d336b` | `#e4e7f7` |  |
| `border` | `#dee1f4` | `#2c3258` | grey 30：分隔線 |
| `border-strong` | `#b1b7e6` | `#3f4775` | grey 40：中性按鈕框 |
| `input` | `#dee1f4` | `#2c3258` |  |
| `ring` | `#2d336b` | `#9aa3cf` | 聚焦框線 |

## 狀態色

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `destructive` | `#ef4564` | `#ff6b85` | red default |
| `destructive-foreground` | `#c7334e` | `#ff9aac` | 深珊瑚：錯誤淡底上的字 |
| `destructive-muted` | `#fff1f4` | `#3a1628` | 珊瑚霧：錯誤淡底 |
| `success-foreground` | `#00a756` | `#3ddc8e` | 成功標籤字（同 primary） |
| `success-muted` | `#ecfef5` | `#12372a` | 薄荷霧：成功淡底 |
| `info` | `#0066ff` | `#5c9dff` | blue default：連結、勾選框 |
| `info-muted` | `#f1f6ff` | `#16264a` | blue lighter：資訊提示底 |
| `info-foreground` | `#0032b1` | `#a9c8ff` | blue dark：資訊提示文字 |
| `info-subtle` | `#f3f7ff` | `#121d3a` | blue lightest：大面積提示區 |
| `warning` | `#c65300` | `#ff9a4d` | Orange Dark：待受理 |
| `warning-muted` | `#fff4ec` | `#3a2414` | 橘霧：警示淡底 |
| `warning-bright` | `#ff8227` | `#ffa860` | 亮橘：只給圖示與點綴，不放文字 |
| `star` | `#ffb400` | `#ffc633` | 星等黃：評分星星專用 |

## 浮層與預覽

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `toast` | `#1e1e1e` | `#f3f4fc` | Grey_100 |
| `toast-foreground` | `#ffffff` | `#171b36` |  |
| `overlay` | `#3a3d5c` | `#05060f` | 彈窗遮罩（搭配 50% 透明） |
| `viewer` | `#0e1124` | 同淺色 |  |
| `viewer-foreground` | `#ffffff` | 同淺色 |  |

## 看板主題色

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `banner-blue` | `#007dfa` | 同淺色 |  |
| `banner-green` | `#08a24b` | 同淺色 |  |
| `banner-orange` | `#d06100` | 同淺色 |  |
| `banner-purple` | `#7041b2` | 同淺色 |  |
| `banner-black` | `#353b41` | 同淺色 |  |
| `banner-foreground` | `#ffffff` | 同淺色 | 看板上的字與按鈕底 |

## 即時統計色階

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `stat-1` | `#0032b1` | `#a9c8ff` | blue dark |
| `stat-2` | `#0066ff` | `#5c9dff` | blue default |
| `stat-3` | `#8f9bc8` | `#6f79a8` | grey 50 |
| `stat-4` | `#b1b7e6` | `#4a5384` | grey 40 |
| `stat-5` | `#dee1f4` | `#2c3258` | grey 30 |
| `stat-soft` | `#d9e6ff` | `#1f3566` | blue light |
| `stat-on-strong` | `#ffffff` | `#0e1124` |  |

## 圖表

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `chart-1` | `#00a756` | `#00a756` |  |
| `chart-2` | `#0066ff` | `#5c9dff` |  |
| `chart-3` | `#c65300` | `#ff9a4d` |  |
| `chart-4` | `#ef4564` | `#ff6b85` |  |
| `chart-5` | `#8f9bc8` | `#9aa3cf` |  |

## 側邊欄

| Utility | 淺色 | 深色 | 用途 |
| --- | --- | --- | --- |
| `sidebar` | `#f7f8fe` | `#0e1124` |  |
| `sidebar-foreground` | `#2d336b` | `#e4e7f7` |  |
| `sidebar-primary` | `#00a756` | `#00a756` |  |
| `sidebar-primary-foreground` | `#ffffff` | `#ffffff` |  |
| `sidebar-accent` | `#ecfef5` | `#12372a` | primary light：目前頁面 |
| `sidebar-accent-foreground` | `#00a756` | `#3ddc8e` |  |
| `sidebar-border` | `#dee1f4` | `#2c3258` |  |
| `sidebar-ring` | `#2d336b` | `#9aa3cf` |  |

## 圓角

| Utility | 值 |
| --- | --- |
| `rounded-lg` | `0.625rem` |
| `rounded-sm` | `calc(var(--radius) * 0.6)` |
| `rounded-md` | `calc(var(--radius) * 0.8)` |
| `rounded-lg` | `var(--radius)` |
| `rounded-xl` | `calc(var(--radius) * 1.4)` |
| `rounded-2xl` | `calc(var(--radius) * 1.8)` |
| `rounded-3xl` | `calc(var(--radius) * 2.2)` |
| `rounded-4xl` | `calc(var(--radius) * 2.6)` |

## 動畫曲線

| Utility | 值 |
| --- | --- |
| `ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` |
| `ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` |

## 動畫

| Utility | 值 |
| --- | --- |
| `animate-reveal` | `reveal 150ms var(--ease-out)` |

## 陰影（只給浮層）

| Utility | 值 |
| --- | --- |
| `shadow-menu` | `0 4px 10px 0 rgb(60 60 85 / 0.2)` |
| `shadow-picker` | `0 0 10px rgb(0 0 0 / 0.25), 0 4px 5px rgb(60 60 85 / 0.4)` |
| `shadow-tab` | `0 0 4px rgb(0 0 0 / 0.2)` |
| `shadow-float` | `0 8px 30px rgb(34 41 98 / 0.12)` |
