# @coss-app/ui

## 0.2.0

### Minor Changes

- 3cd7fee: 新增 `@coss-app/ui/lint.json`：給 `@shadcn/lint`（ESLint／Oxlint）使用的設計規範規則，檢查 `className` 只放版面、顏色只用語意 token、不寫任意值。

## 0.1.2

### Patch Changes

- 改用 npm trusted publishing（GitHub OIDC）發佈，版本附上 provenance 來源證明。

## 0.1.1

### Patch Changes

- 改發佈到 npmjs 公開套件（MIT），安裝不再需要 GitHub token 與 `.npmrc`。

## 0.1.0

### Minor Changes

- 703e3b4: 改用 Base UI（shadcn base-nova），補齊 code-block、questionnaire、toast、trace，並依 DESIGN.md 套用色彩 token 與組件樣式。

  - 破壞性：組件 API 改為 Base UI，`asChild` 改用 `render`；不再依賴 `radix-ui`、`vaul`。
  - globals.css 改為靛藍＋品牌綠 token，新增 `success-*`、`warning-*`、`destructive-*`、`info-subtle`、`overlay` 色與 `shadow-menu`／`shadow-picker`／`shadow-tab`／`shadow-float`。
  - Button 新增 `neutral` variant 與 `block` size；Badge 新增 `info`／`success`／`warning`；Alert 新增 `success`／`warning`；Pagination 新增 `PaginationInfo`。
