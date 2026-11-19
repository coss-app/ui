---
paths:
  - "apps/storybook/**"
  - "scripts/parse-exports.*"
---

# 文件站（apps/storybook）

- story 以消費端路徑 import：`@coss-app/ui/components/<name>`（lint 強制）。`.storybook/main.ts` alias 與 `tsconfig.json` paths 導回 `packages/ui/src`（test 檢查兩處一致）。
- `.storybook/docs-page.tsx` 的「引用方式」由 story 檔名推出組件檔，再解析組件檔尾 `export { … }`（`scripts/parse-exports.mjs`，與 skill manifest 共用）：story 檔名須與組件檔名相同（`button.stories.tsx` ↔ `button.tsx`），組件檔須保留檔尾 export 區塊。
- story 說明寫在 `parameters.docs.description.story`，不寫 JSDoc。
- 使用手冊 `stories/docs/*.mdx`：標題前綴「使用手冊/」，排序在 `preview.tsx` 的 `storySort`；表格靠 `remark-gfm`；內容繁體中文、客服工單情境。新增 story 分類須同步 `storySort` 與 `build-manifest.mjs` 的 `CATEGORY_ORDER`。
- 範例慣例：預設展開的浮層會浮在範例外，外層用 `min-h-*` 預留高度；modal Drawer 預設展開會蓋住 Docs 頁，改 `parameters.docs.story: { inline: false, height }`；Sidebar 在 story 內用 absolute 限制範圍；`cmdk`／`input-otp` 內部受控，不用 `defaultValue`。
- `foundations/` 頁依資料動態設定色票，`eslint.config.mjs` 對其關閉 `no-arbitrary-values`、`no-inline-styles`。
