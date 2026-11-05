---
paths:
  - "apps/storybook/.storybook/manager.ts"
  - "apps/storybook/.storybook/manager-head.html"
  - "apps/storybook/scripts/rebrand-html.mjs"
  - "apps/storybook/public/**"
---

# 文件站品牌

- `manager.ts`：主題、logo、分頁標題。Storybook 寫死「⋅ Storybook」後綴，換成「⋅ coss UI」。
- `manager-head.html`：favicon、og、側欄字級。
- `rebrand-html.mjs`：建置後改寫 `index.html` 的 `<title>`；找不到即建置失敗。
- 靜態檔放 `public/`（含 Cloudflare `_headers`）。
