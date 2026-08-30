# TOMO.

フロントエンドエンジニア・デザイナー TOMO のポートフォリオ兼ブログです。ブログのコンテンツ管理には microCMS、配信には TanStack Start と Cloudflare Workers を使用します。

## 構成

- TanStack Start / React / Vite
- Tailwind CSS
- microCMS（記事・タグ・画像）
- Cloudflare Workers（Webアプリの配信）

`src/routes` はルーティングとloaderの組み立てに留め、ブログのUI・Server Functions・microCMSアクセスは `src/features/blog` にまとめています。ポートフォリオ本体は過度に分割せず、`src/features/portfolio/PortfolioPage.tsx` の1ファイルです。

## microCMSのAPI

サービスIDは `tomo-site` です。

- `blog`: 記事
- `tag`: タグ

`blog` のフィールドは次のとおりです。

- `title`: テキスト（必須、最大160文字）
- `excerpt`: テキストエリア（必須、最大320文字）
- `content`: リッチエディタ（必須）
- `coverImage`: 画像
- `tags`: `tag` への複数コンテンツ参照（必須、1〜5件）

`tag` は `name` フィールドを持ちます。コンテンツIDは小文字英数字とハイフンを使用してください。

## ローカル開発

```powershell
bun install
Copy-Item .dev.vars.example .dev.vars
bun run dev
```

`.dev.vars` に次の値を設定します。このファイルはGit管理されません。

```dotenv
APP_ENV=development
SITE_URL=http://localhost:5173
MICROCMS_SERVICE_DOMAIN=tomo-site
MICROCMS_API_KEY=読み取り専用のAPIキー
MICROCMS_PREVIEW_SECRET=32文字以上のランダムな共有シークレット
```

ローカルと本番は同じmicroCMSサービスを参照します。公開ページが取得するのは公開済み記事だけです。下書きは `draftKey` と共有シークレットの両方が正しいプレビューURLからだけ確認できます。

ローカル用の画面プレビューURLは次の形式です。

```text
http://localhost:5173/blog/preview/{CONTENT_ID}?draftKey={DRAFT_KEY}&secret=共有シークレット
```

## 本番Cloudflare設定

デプロイ前に、microCMSのAPIキーとプレビュー用共有シークレットをWorker Secretsへ設定します。値はリポジトリへ保存しません。

```powershell
bunx wrangler secret put MICROCMS_API_KEY
bunx wrangler secret put MICROCMS_PREVIEW_SECRET
```

本番URLが決まったら、microCMSの画面プレビューURLを次の形式へ変更します。

```text
https://本番ドメイン/blog/preview/{CONTENT_ID}?draftKey={DRAFT_KEY}&secret=共有シークレット
```

`SITE_URL` は未設定でもリクエスト元のオリジンを使用します。固定したい場合は本番環境変数として設定してください。

## セキュリティ

- microCMS APIキーはサーバー側だけで使用し、ブラウザへ渡しません。
- APIキーはGET権限だけに制限します。
- リッチエディタのHTMLはサーバーで許可リスト型のサニタイズを行います。
- 記事画像は `images.microcms-assets.io` のHTTPS URLだけを許可します。
- プレビューはキャッシュ禁止、検索エンジンの登録禁止、リファラー送信禁止です。
- APIエラー本文や秘密値は公開レスポンスへ含めません。

## コマンド

```powershell
bun run dev
bun run lint
bun run typecheck
bun run test
bun run build
bun run preview
bun run cf-typegen
```

検証後のデプロイは `bun run deploy` で行います。
