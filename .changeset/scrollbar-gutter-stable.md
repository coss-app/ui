---
"@coss-app/ui": minor
---

`globals.css`：`<html>` 預設加上 `scrollbar-gutter: stable`，預留捲軸槽。篩選、分頁、展開收合、載入完成讓頁面在「可捲動／不可捲動」之間切換時，內容不再橫向跳動（只影響 Windows、Linux 等固定捲軸的環境）。短頁右側會固定留一條捲軸寬的空白；要取消可在專案樣式加 `html { scrollbar-gutter: auto }`。
