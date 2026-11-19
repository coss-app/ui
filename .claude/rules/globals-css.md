---
paths:
  - "packages/ui/src/styles/globals.css"
  - "scripts/token-notes.json"
---

# globals.css（唯一 token 來源）

- `@source "../components"` 勿刪：消費端 Tailwind 靠它掃描 dist 內 class。
- `--font-sans: var(--font-sans, "Inter"), …` 須帶後備值：未注入時自我參照成循環，整條 font-family 失效退回襯線字。
- 減少動態規則依賴 Base UI 的 `data-slot`／`data-starting-style`／`data-ending-style`（sheet-content、drawer-popup、toast）。
- 新增色彩 token：`:root`、`.dark`、`@theme inline` 三處加齊（淺深色同值者在 `scripts/token-notes.json` 標 `sameInDark`），並在該檔寫 `note`；缺漏由 `npm run manifest -- --check` 擋下。新 token 不屬 `build-manifest.mjs` 的 `TOKEN_GROUPS` 也會失敗。
