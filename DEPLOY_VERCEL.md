# Deploy do Código Zero na Vercel

O Código Zero está preparado para publicação como um **SPA estático**. O progresso local funciona sem configuração adicional; a sincronização entre dispositivos usa Supabase diretamente no navegador.

## 1. Importar o repositório

1. Faça push deste projeto para um repositório GitHub.
2. Na Vercel, escolha **Add New → Project** e importe o repositório.
3. A Vercel detectará `vercel.json` e usará:
   - **Build command:** `pnpm build:static`
   - **Output directory:** `dist/public`
4. Publique o projeto.

## 2. Configurar o Supabase

No projeto Supabase:

1. Abra **Project Settings → API**.
2. Copie a **Project URL** e a chave pública **anon**.
3. Execute [`supabase/schema.sql`](./supabase/schema.sql) no **SQL Editor**.
4. No Supabase, abra **Authentication → Providers → Email** e desative **Confirm email**. Assim o cadastro entra imediatamente, sem exigir clique em e-mail.
5. Na Vercel, abra **Settings → Environment Variables** e adicione para `Production` (e `Preview`, se quiser):

```text
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

6. Faça um novo deploy após salvar as variáveis.

> Nunca use `service_role` no frontend. A segurança dos dados depende das políticas RLS do arquivo SQL.

## 3. O que funciona sem Supabase

- Toda a trilha, aulas, vídeos, quizzes, editor e projetos.
- Progresso, respostas, links e projetos concluídos salvos no `localStorage` deste navegador.
- A tela de perfil indica claramente quando a aplicação está em **Modo local**.

Com as variáveis e o schema configurados, o perfil libera login por e-mail e senha e sincroniza o progresso da conta autenticada.

## 4. Atualizações futuras

Cada push na branch conectada gera um novo deploy. O fallback de rotas em `vercel.json` permite abrir diretamente URLs como `/trilha`, `/aula/fundamentos/mapa-da-web` e `/projetos`.
