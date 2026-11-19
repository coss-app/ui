---
paths:
  - ".changeset/**"
  - ".github/workflows/**"
  - "packages/ui/package.json"
  - "packages/ui/CHANGELOG.md"
---

# 發版與部署

- main 受保護：須走 PR 且 `ci` 檢查通過。repo 不允許 Actions 開 PR，故不用 `changesets/action`。
- 流程：功能 PR 附 `npx changeset` → 要發版時開分支跑 `npx changeset version && npm install && npm run manifest`（manifest 把新版本號寫進 `components.md`／`tokens.md`／`manifest.json`，供判斷專案裝的套件夠不夠新），以 PR 合併。
- `release.yml`：main 上 `packages/ui/package.json` 版本尚未發佈 → `changeset publish`、推 tag `@coss-app/ui@x.y.z`、建 GitHub Release（取 CHANGELOG 該版段落）；已發佈則略過。
- `docs.yml`：PR 部署預覽並留言網址；push 到 main（`apps/storybook/**`、`packages/ui/**`、`scripts/parse-exports.*`、`package-lock.json`、`docs.yml` 有變動）與 `workflow_dispatch` 部署正式站（Cloudflare Pages 專案 `coss-ui`）。正式站可能領先已發佈版本。
- secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`；tag 與 Release 用內建 `GITHUB_TOKEN`。npmjs 走 trusted publishing（OIDC），無 npm token；設定在 npmjs `@coss-app/ui` 套件頁（Trusted Publisher：`coss-app`／`ui`／`release.yml`，須勾 Allow npm publish，否則只 stage 不上架）。`release.yml` 須 `id-token: write`，且 npm ≥ 11.5.1（Node 22 內建 npm 10，故先升級）。
- 發佈檔（globals.css、組件、LICENSE、lint.json）有變動就附 changeset。
