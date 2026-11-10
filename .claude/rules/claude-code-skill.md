---
paths:
  - "plugins/coss-ui/**"
  - "scripts/**"
  - ".claude-plugin/**"
---

# Claude Code skill（plugins/coss-ui）維護

- 手寫：`SKILL.md`、`references/{decision-guide,design-rules,ux-rules,patterns,setup}.md`（UX 規則——手機浮層、觸控、載入回饋、可及性——只寫在 `ux-rules.md`，`design-rules.md`、`decision-guide.md` 對應處只放連結，勿重複寫）。產生、勿手改：`references/components.md`、`tokens.md`、`plugins/coss-ui/manifest.json`——由 `npm run manifest`（`scripts/build-manifest.mjs`）產生。
- `plugin.json` 刻意不設 `version`：無 version 時 Claude Code 以 git commit 判斷更新，main 每次改動同事更新後都拿得到；設了 version 就只有升版才會更新。
- 匯出解析 `scripts/parse-exports.mjs` 與文件站「引用方式」（`docs-page.tsx`）共用；改它兩邊都受影響。
- `skills/coss-ui/scripts/check-usage.mjs`：給消費端專案的違規檢查（無依賴純文字比對）。規則在腳本 `RULES`，須與 `SKILL.md`「硬規則」同步；改規則後用含違規與正常寫法的樣本檔驗證，且 `patterns.md` 範例須零違規。
- `patterns.md` 範例須通過型別檢查：改動後把 tsx 區塊抽出，以 tsconfig `paths` 指向 `packages/ui/src`，跑 `tsc --noEmit`。
- `packages/ui/lint.json`（隨套件發佈給 `@shadcn/lint`）的 contracts 須與 SKILL.md 硬規則 6、7 同步；改後跑 `npm run lint`（stories 須零違規），並用 `npm pack` 裝進暫存專案驗證違規有被抓、`patterns.md` 的 tsx 區塊零違規。
