# slide — Archived

> [!IMPORTANT]
> このリポジトリは **`erutobusiness/presentations`** に統合され、archive されました（2026-05）。
> Next.js + React 19 のカスタムスライドフレーム部分と、同梱されていた `declarativeUI` / `theArtOfLovingWork` のプレゼンデータは [`presentations/tech/next-custom/`](https://github.com/erutobusiness/presentations/tree/master/tech/next-custom) に移管済み。

## 後継リポジトリ

- **presentations**: https://github.com/erutobusiness/presentations
  - `tech/next-custom/` — 旧 slide リポ本体（src/ public/ next.config.ts 等）
  - `slides/` — 各プレゼン（Marp / Remotion @player / Next.js）

移行詳細は presentations 側の以下を参照:

- `design/migration-plan.md` Phase M3
- `knowledge/slide-absorption-notes.md` — 吸収時のアーキ差分・除外項目・残 TODO

## 旧 README

これは [Next.js](https://nextjs.org) プロジェクト ([`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) で生成) でした。
GitHub Pages の `/slide/` パスにデプロイされていたため `next.config.ts` で `basePath: '/slide'` を指定していました（presentations 移管時に削除）。
