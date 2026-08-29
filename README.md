# TOMO.

フロントエンドエンジニア・デザイナー TOMOのwebサイトです。
制作実績や日々の学び、コーディング・デザインについての備忘録をまとめています。

## 技術スタック

- TanStack Start
- Vite
- Tailwind CSS
- Cloudflare Workers

## Development

```bash
bun run dev
```

Open http://localhost:5173 in your browser.

## Commands

```bash
bun run lint
bun run typecheck
bun run build
bun run preview
bun run cf-typegen
bun run deploy
```

CloudflareのBindingsを変更した場合は、`bun run cf-typegen`で型定義を更新してください。
