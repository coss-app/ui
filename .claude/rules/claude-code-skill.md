---
paths:
  - "plugins/coss-ui/**"
  - "scripts/**"
  - ".claude-plugin/**"
  - "packages/ui/lint.json"
  - "tests/**"
---

# Claude Code skill（plugins/coss-ui）維護

- 分發：repo 即 plugin marketplace（`.claude-plugin/marketplace.json`，消費端 `/plugin marketplace add coss-app/ui`）；`npx skills add coss-app/ui --skill coss-ui` 掃 repo 內 `SKILL.md`。
- skill 目錄 = `plugins/coss-ui/skills/coss-ui/`。手寫：`SKILL.md`、`references/{decision-guide,design-rules,ux-rules,patterns,setup}.md`（UX 規則只寫在 `ux-rules.md`，`design-rules.md`、`decision-guide.md` 對應處只放連結）。產生、勿手改：`references/components.md`、`tokens.md`、`plugins/coss-ui/manifest.json`（`npm run manifest`；來源為組件匯出與 cva variants、story 的 `meta.title`、`globals.css`、`scripts/*-notes.json`）。
- 新增組件：`scripts/component-notes.json` 補一句用途（缺或多都失敗）→ `npm run manifest` → 視需要更新 `decision-guide.md`。
- `plugin.json` 刻意不設 `version`：無 version 時以 git commit 判斷更新，main 每次改動同事都拿得到。
- `scripts/parse-exports.mjs` 與文件站 `docs-page.tsx` 共用；改它兩邊都受影響。
- `check-usage.mjs`（skill 目錄內）給消費端專案用，無依賴純文字比對；規則在 `RULES`，須與 `SKILL.md`「硬規則」同步，`tests/check-usage.test.mjs` 每條規則各一個樣本，新增規則補測試。
- `lint.json` 的 contracts 須與 `SKILL.md` 硬規則 6、7 同步；`check:patterns` 以 `lint.json` 與 `tsc` 驗證 `patterns.md` 的 tsx 區塊。改 `lint.json` 後另用 `npm pack` 裝進暫存專案確認違規有被抓。
