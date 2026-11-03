# TODO — Código Zero

## Plataforma navegável e identidade visual

- [x] A aplicação está em português brasileiro, com navegação entre visão geral, trilha, módulos, aula, exercícios, editor, projetos, dashboard, perfil e avaliações.
- [x] A interface tem design terminal editorial moderno, hierarquia tipográfica clara, espaçamento consistente, contraste adequado, responsividade desktop/mobile, foco visível e estados de modo local, sucesso, erro, vazio e conteúdo bloqueado.
- [x] A página inicial explica a proposta do curso, mostra progresso real e aponta para a próxima aula sem despejar o conteúdo completo.

## Trilha e aulas

- [x] A trilha contém 8 módulos e 41 aulas: primeiros passos, HTML, CSS, JavaScript, sites completos, Git/GitHub, publicação e próximos passos.
- [x] Cada aula tem título, objetivo, duração, explicação original em três partes, exemplo de código quando aplicável, prática guiada, dica, solução comentada, quiz de quatro ou cinco questões, conclusão e avanço para a próxima aula.
- [x] Todas as 41 aulas possuem uma referência externa de vídeo, playlist ou aula da plataforma. As referências foram pesquisadas e catalogadas em `docs/video-sources.md`.
- [x] Playlists e fontes externas são exibidas como referência com abertura segura em nova página; vídeos individuais podem ser incorporados quando o YouTube permite.
- [ ] Produzir gravações próprias do Código Zero com roteiro, áudio, edição e hospedagem. Isso é uma etapa de produção audiovisual, não foi inventado como concluída.

## Exercícios e editor

- [x] O banco possui 172 questões distribuídas entre fundamentos, HTML, CSS, JavaScript, sites, Git, deploy e próximos passos, com múltipla escolha, verdadeiro/falso e leitura de código.
- [x] A correção informa pontuação, feedback, explicação, histórico, revisão de erros e possibilidade de refazer.
- [x] O editor permite HTML, CSS e JavaScript, execução em preview, restauração e isolamento em `iframe sandbox`; as aulas oferecem dicas e soluções comentadas.
- [ ] Adicionar no editor uma comparação automática entre código enviado e solução ideal para cada prática guiada.

## Projetos e avaliações

- [x] Existem projetos de página pessoal, landing page, calculadora, lista de tarefas, empresa fictícia, portfólio e projeto final publicado.
- [x] Cada projeto expõe descrição, objetivo, requisitos, etapas, checklist, critérios de avaliação, referência e campo para URL publicada.
- [x] Existem avaliações por módulo e avaliação final cumulativa; elas corrigem, exibem nota, feedback, recomendação e permitem refazer.
- [x] O certificado foi removido para manter o produto simples e não sugerir uma certificação oficial.

## Persistência e Supabase

- [x] O progresso é persistido em `localStorage` durante o modo local e sincronizado com Supabase quando `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estiverem configurados e o usuário entrar com e-mail e senha.
- [x] O SQL do Supabase cria tabelas de progresso e projetos com políticas RLS para que cada aluno veja e altere apenas seus próprios registros.
- [x] O perfil oferece cadastro, login e saída com e-mail e senha; a interface mantém o modo local quando o Supabase não está configurado.
- [ ] O usuário ainda precisa executar `supabase/schema.sql` e cadastrar as duas variáveis públicas na Vercel.

## Qualidade e entrega

- [x] O manifesto `manus-routes.json` reflete todas as rotas de página.
- [x] O projeto passa em `pnpm check`, `pnpm test -- --run` e `pnpm build:static`; o bundle emite apenas um aviso de tamanho, sem erro de compilação.
- [x] O Preview responde com HTTP 200 nas rotas principais, `/api/health` retorna `{"status":"ok"}` e o catálogo exporta 8 módulos, 41 aulas e 172 questões.
- [x] O projeto contém `vercel.json`, `DEPLOY_VERCEL.md`, `.env.example`, schema Supabase e catálogo de fontes para publicação externa.
- [ ] Publicação final na Vercel depende do repositório GitHub do usuário e das configurações externas do Supabase.
