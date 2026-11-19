---
paths:
  - "packages/ui/components.json"
  - "packages/ui/src/components/ui/**"
  - "packages/ui/src/styles/shadcn-tailwind.css"
---

# shadcn CLI

- 在 `packages/ui` 執行 `npx shadcn@latest add <name>`。
- `--overwrite` 會蓋掉已依 DESIGN.md 調整的 class：先看 diff，再重套樣式。
- add 之後跑 `npm run verify`：`cn` import／依賴、`shadcn` 進 dependencies、相對路徑 import 由 lint 與 `check:deps` 擋下；`shadcn` 只能在 devDependencies。
- `src/styles/shadcn-tailwind.css` 是 `shadcn/dist/tailwind.css` 的複本（去註釋），使用端因此不必裝 shadcn CLI。`check:shadcn-css` 不同步就失敗：複製上游內容並刪註釋。MIT 出處在 `packages/ui/LICENSE`。
