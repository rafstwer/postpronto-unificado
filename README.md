# PostPronto — Unificado

Versão unificada do Social Kit Studio com o melhor dos 3 projetos:

- **Base**: `github-social-kit-studio` (Lovable · TanStack Start · Vite 8 · Supabase · Nitro Cloudflare)
- **Loja + 7 nichos**: `postpronto-projeto-z-ai` (beleza, cabelo, unhas, maquiagem, alimentação, barbearia, premium — 50 peças cada, Acesso Completo R$ 10,00 libera todos)
- **Editorial + kits**: `postpronto-onspace-ai` (layouts editoriais luxury/rose/spotlight, 4 kits Hair/Nails/Cosmetics, backup + legenda)
- **Tudo 100% online, exportação só em PNG** (sem PDF) via `html-to-image` em alta qualidade (1080×1350 feed, 1080×1920 story)

## O que tem de novo nesta versão

- `src/lib/kits.ts`: 7 kits × ~50 peças (20 feed, 15 stories, 5 carrosséis, 5 reels, 5 promos) = 350 peças. Marca por nicho (lilás cabelo, dourado unhas, magenta maquiagem, escuro alimentação, preto/dourado barbearia, bordô premium).
- `src/lib/catalog.ts`: catálogo do Z-AI adaptado (ALL_ACCESS `acesso-total` R$ 10,00, `PRODUCTS` 7×50).
- Loja estilo Z-AI na Home: `Hero`, `NicheGrid`, `FeaturedKit`, `HowItWorks`, `Newsletter`, `SiteFooter` + `SiteHeader`.
- `/kits`: Acesso Completo no topo + 7 kits. Pix libera só o kit ou tudo via `acesso-total`. No editor, `acesso-total` aprovado desbloqueia todos os kits.
- Editor online: textos, fotos (data URL inline), logo e cores; preview com marca d'água; salvar em `designs`; baixar PNG; baixar carrossel completo (PNGs sequenciais); legenda sugerida com hashtags.
- Cloudflare-ready: `vite.config.ts` já usa Nitro Cloudflare via `@lovable.dev/vite-tanstack-config`; `wrangler.toml` aponta para `.output`.

## Desenvolvimento

```sh
npm i
npm run dev
npm run build
npx wrangler deploy  # Cloudflare Worker postpronto-unificado
```

## GitHub / Cloudflare

- Novo repo: `rafstwer/postpronto-unificado`
- Cloudflare Worker: `postpronto-unificado` (conta `rafstwer@gmail.com`)

> Este repositório é separado do projeto Lovable original (`social-kit-studio`). Para mexer no esquema do banco, continue pedindo pelo Lovable; aqui o schema Supabase (`kit_purchases`, `designs`) é reutilizado sem alterações.
