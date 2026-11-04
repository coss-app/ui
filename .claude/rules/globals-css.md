---
paths:
  - "packages/ui/src/styles/globals.css"
---

# globals.css（唯一 token 來源）

- `@source "../components"` 勿刪：消費端 Tailwind 靠它掃描 dist 內 class。
- `--font-sans: var(--font-sans, "Inter"), …` 須帶後備值：未注入時自我參照成循環，整條 font-family 失效退回襯線字。
- 減少動態規則依賴 Base UI 的 `data-slot`／`data-starting-style`／`data-ending-style`（sheet-content、drawer-popup、toast）。
- 新增色彩 token 須同時寫 `:root`、`.dark`、`@theme inline` 三處。
