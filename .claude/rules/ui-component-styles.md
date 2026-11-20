---
paths:
  - "packages/ui/src/components/ui/**/*.tsx"
---

# 組件樣式慣例（DESIGN.md 落地）

- 輸入類（input、textarea、select trigger、input-group、OTP…）：`bg-muted`、`border-[1.5px] border-transparent`、聚焦 `focus-visible:border-ring focus-visible:bg-card`、錯誤 `aria-invalid:border-destructive aria-invalid:bg-card`、placeholder `text-placeholder`、高 `h-10`。
- 浮層（menu、select、popover、hover-card…）：`shadow-menu dark:ring-1 dark:ring-border`；項目 `h-10 px-3.5`，hover `bg-background dark:bg-accent`。
- 選中／勾選／日期／開關／滑桿用主色 `bg-primary`／`bg-primary-muted`＋`text-primary-muted-foreground`，由 `coss/selected-uses-primary` 擋 `info`；連結與資訊提示用 `text-info`；成功用 `success-foreground`；`sidebar-accent` 只給側欄。
- 主要按鈕膠囊 `rounded-full`；容器 10px（`rounded-lg`）；彈窗、抽屜 25px；遮罩 `bg-overlay/50`。
- 字重僅 400／500／600（`font-bold` 由 lint 擋）；`font-medium` 僅給日期格等 DESIGN.md 指定處。
