# slide — TODO

## Security

サプライチェーンセキュリティ調査から導出されたアクション。

- [ ] GitHub Actions（deploy.yml）をSHA pinningに変更
- [ ] `peaceiris/actions-gh-pages@v4` もSHA pinningに変更（サードパーティアクション）
- [ ] `npm audit fix` で脆弱性10件（critical 1, high 3, moderate 5, low 1）を解消
- [ ] `.npmrc` に `ignore-scripts=true` を追加
- [ ] deploy.ymlの `npm install` を `npm ci` に変更
