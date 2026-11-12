# @coss-app/ui

## 0.3.0

### Minor Changes

- bccc5d0: `globals.css`：`<html>` 預設加上 `scrollbar-gutter: stable`，預留捲軸槽。篩選、分頁、展開收合、載入完成讓頁面在「可捲動／不可捲動」之間切換時，內容不再橫向跳動（只影響 Windows、Linux 等固定捲軸的環境）。短頁右側會固定留一條捲軸寬的空白；要取消可在專案樣式加 `html { scrollbar-gutter: auto }`。

### Patch Changes

- 不再讓使用端安裝 `shadcn` CLI：`globals.css` 唯一用到的 `shadcn/tailwind.css` 改為套件內建的 `shadcn-tailwind.css`，`shadcn` 移到 devDependencies。使用端 `npm audit` 不再因 `ts-morph → minimatch`、`@shadcn/registry → deepmerge` 出現 7 筆無法自行修正的弱點。樣式與 class 不變。
- 2b8cf01: Toast：手機版（底部置中）與桌面版（左下角）的切換斷點由 `sm`（640px）改為 `md`（768px），與其他元件及 UX 規則的手機斷點一致。

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
