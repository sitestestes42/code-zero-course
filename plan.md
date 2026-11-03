# Plano de implementação — Código Zero

## Direção do produto

A primeira entrega transforma o scaffold React/Express em um MVP educacional funcional, navegável e pronto para receber conteúdo. A interface será em português brasileiro e prioriza o percurso do iniciante: descobrir a trilha, iniciar a próxima aula, praticar, receber feedback e acompanhar o progresso.

## Arquitetura

- **Frontend:** React + TypeScript + Wouter, com dados curriculares em módulos tipados e componentes reutilizáveis.
- **Persistência:** Supabase opcional por variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Quando configurado, o cliente usa Auth e a tabela `lesson_progress`; sem as variáveis, a aplicação funciona em modo local com `localStorage`, exibindo o estado de configuração.
- **Dados de curso:** `client/src/data/course.ts`, com 8 módulos, 41 aulas, 172 questões, projetos, referências de vídeo e avaliações. O conteúdo fica separado da interface para facilitar atualização.
- **Editor:** preview isolado em `iframe` com `sandbox="allow-scripts"`, gerado a partir do HTML/CSS/JS do exercício. Não executa o código no contexto privilegiado da aplicação.
- **UI:** shell com sidebar desktop, barra superior, navegação mobile, dashboard de entrada, páginas de trilha, aula, exercícios, editor, projetos, avaliações, certificado e perfil.
- **Backend:** o scaffold Express/tRPC continua disponível para healthcheck e extensões futuras. A persistência principal do MVP usa Supabase diretamente no browser com RLS, sem expor segredos.

## Estrutura principal

- `client/src/App.tsx`: roteamento e providers.
- `client/src/components/AppShell.tsx`: navegação e chrome da aplicação.
- `client/src/data/course.ts`: currículo, aulas, quizzes e projetos.
- `client/src/lib/supabase.ts`: cliente opcional do Supabase.
- `client/src/lib/progress.ts`: leitura/escrita de progresso local ou sincronizado.
- `client/src/pages/*`: telas da experiência do aluno.
- `client/src/index.css`: tokens visuais, responsividade e componentes editoriais.
- `supabase/schema.sql`: tabelas, índices e políticas RLS para ativação no projeto Supabase.
- `public/manus-routes.json`: manifesto de rotas do Webdev.

## Design

### Estilos considerados

- **Terminal editorial:** 0,06 — preto suave, verde menta e blocos de código como linguagem visual principal.
- **Swiss learning studio:** 0,07 — tipografia editorial, grids assimétricos e cor de destaque precisa.
- **Soft SaaS acadêmico:** 0,04 — interface clara, cards arredondados e tons azuis.

### Escolha: Terminal editorial

- **Design Movement:** uma mistura de brutalismo digital controlado e editorial suíço, com superfícies escuras, tipografia monoespaçada para dados e grandes títulos para orientar o olhar.
- **Princípios:** foco no próximo passo; contraste forte entre conteúdo e ação; densidade informacional com respiro; feedback visível.
- **Filosofia de cor:** carvão profundo cria concentração, marfim aquece a leitura e o verde `#b8f36b` sinaliza progresso, código executável e pequenas vitórias.
- **Paradigma de layout:** sidebar fixa e conteúdo em fluxo, com painéis assimétricos e uma coluna de ação clara em vez de uma grade centralizada genérica.
- **Elementos assinatura:** marca em forma de cursor `>_`; barras de progresso com trilha pontilhada; cards com etiqueta de status e acentos verdes.
- **Interação:** cada ação revela consequência imediata, com estados concluído, em andamento e desbloqueado. O aluno sempre tem uma próxima ação recomendada.
- **Animação:** entradas curtas de 180–260ms, shimmer apenas em carregamento, progress bars que preenchem suavemente e nenhum movimento que distraia a leitura.
- **Tipografia:** Space Grotesk para títulos e interface; IBM Plex Mono para metadados, tags e código. A hierarquia usa títulos compactos, números grandes e textos auxiliares de alto contraste.
- **Essência da marca:** uma trilha prática para quem quer sair da primeira linha de código e publicar algo real — direta, encorajadora, engenhosa.
- **Tom de voz:** claro, próximo e sem jargão desnecessário. Exemplos: “Seu próximo passo já está separado.” e “Aprenda a explicar o que você construiu.”
- **Marca:** wordmark “códigozero” em minúsculas com o `>` como cursor inicial e um sublinhado curto como caret.
- **Cor proprietária:** verde-lima `#b8f36b`, usado com parcimônia para marcar progresso e ação.

## Escopo da primeira entrega

1. Dashboard rico com progresso derivado dos dados reais da trilha.
2. Trilha completa com 8 módulos e 41 aulas específicas.
3. Aula individual com vídeo externo legítimo, conteúdo escrito, exemplo, exercício e quiz.
4. Correção automática, feedback e histórico local/sincronizável.
5. Editor seguro para um exercício de HTML/CSS/JS com preview isolado.
6. Área de projetos com requisitos, checklist e campo de link publicado.
7. Avaliações e certificado com regras explícitas de conclusão.
8. Integração Supabase preparada e SQL com RLS.
9. Manifesto de rotas, diagnósticos, build e checkpoint.

## Limites conhecidos

- Vídeos são referências externas do YouTube; o conteúdo textual permanece disponível mesmo quando a incorporação estiver bloqueada.
- A sincronização Supabase depende de o usuário criar as tabelas do arquivo `supabase/schema.sql` e informar as variáveis públicas do projeto.
- Certificado é de conclusão da plataforma e não representa reconhecimento por órgão externo.
