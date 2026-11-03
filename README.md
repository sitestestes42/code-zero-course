# Código Zero — Do Zero ao Seu Primeiro Site

Plataforma educacional em português brasileiro para aprender fundamentos da web, praticar com feedback e publicar um primeiro projeto.

## O curso atual

A trilha possui **8 módulos e 41 aulas**, com aproximadamente 21 horas de conteúdo guiado, 172 questões, exemplos comentados, práticas graduais, referências de vídeo verificadas, editor isolado e 7 projetos de portfólio.

Os vídeos são referências externas de fontes educacionais como Curso em Vídeo, Rafaella Ballerini, Alura, Rocketseat e outros canais. Eles não são gravações próprias do Código Zero. A explicação escrita, o exemplo, a prática e o quiz continuam disponíveis na plataforma mesmo quando uma playlist externa mudar.

O catálogo das fontes está em [`docs/video-sources.md`](./docs/video-sources.md).

## Rodar localmente

```bash
pnpm install
pnpm dev
```

Comandos úteis:

- `pnpm check`: verificação TypeScript.
- `pnpm test`: testes do scaffold e integrações de plataforma.
- `pnpm build`: build completo React + servidor Express.
- `pnpm build:static`: build estático para a Vercel.
- `pnpm start`: serve o build completo em `dist/index.js`.

## Supabase

O app roda em **modo local** por padrão e persiste o progresso no navegador. Para cadastro/login com e-mail e senha e sincronização entre dispositivos:

1. Execute [`supabase/schema.sql`](./supabase/schema.sql) no SQL Editor do Supabase.
2. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` na Vercel.
3. Em **Authentication → Providers → Email**, desative **Confirm email** para que o cadastro funcione sem confirmação.
4. Faça novo deploy.

Consulte [`DEPLOY_VERCEL.md`](./DEPLOY_VERCEL.md) para o passo a passo. A chave `service_role` nunca deve ser usada no browser.

## Estrutura

- `client/src/data/course.ts`: currículo completo, referências, aulas, quizzes e projetos.
- `client/src/components/AppShell.tsx`: navegação desktop/mobile.
- `client/src/pages/CoursePages.tsx`: dashboard, trilha, aula, exercícios, editor, projetos, avaliações e perfil.
- `client/src/lib/progress.tsx`: persistência local e sincronização opcional com Supabase.
- `supabase/schema.sql`: tabelas e RLS do progresso.
- `vercel.json`: build estático e fallback SPA.
