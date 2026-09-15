# Study Tracker — Etapa 6

Aplicação estática em HTML, CSS e JavaScript Vanilla, com Chart.js, cache em LocalStorage e persistência principal em Google Sheets por meio de Google Apps Script.

## Executar localmente

Sirva a pasta com um servidor HTTP (abrir por `file://` pode limitar chamadas de rede):

```bash
npx serve .
```

## Estrutura

- `js/storage.js`: cache local, cronômetro e metadados de sincronização.
- `js/api.js`: único ponto de acesso HTTP.
- `js/sync.js`: migração, merge last-write-wins e recuperação offline.
- `js/reviews.js`: regras puras de revisão espaçada.
- `js/app.js`: interface, métricas, CRUD e gráficos.
- `backend/Code.gs`: Web App para Google Sheets.
- `SETUP.md`: configuração e publicação passo a passo.

## Dados e sincronização

A tela abre imediatamente com o cache local. Depois consulta a nuvem, une registros pelo `id` e conserva a versão com o `updatedAt` mais recente. Se o backend estiver vazio, os dados locais são migrados automaticamente. Exclusões usam tombstones para que registros antigos não reapareçam.

Uma revisão possui `sessionId`, ligando-a à única sessão usada nas estatísticas e evitando dupla contagem. O intervalo salvo não é recalculado ao renderizar o dashboard.

## Backup e segurança

Google Sheets é a persistência principal; LocalStorage permanece como cache/fallback. A URL do Apps Script não é segredo e nenhum token deve ser inserido no frontend. Uma implantação pública pode ser chamada por quem descobrir a URL; mantenha-a privada e não armazene dados sensíveis.

## Publicação

O frontend está pronto para GitHub Pages. As instruções completas estão em `SETUP.md`.

## Versão 1.1 — contexto de questões e simulados

Esta versão adiciona dois módulos sem remover os recursos da Etapa 6:

- **Contexto das questões**: `Durante o estudo`, `Bateria independente` e `Revisão programada`. Todas contam no volume geral; para diagnóstico de domínio, baterias independentes e revisões têm precedência quando existirem.
- **Simulados**: registro de nome, data, nota geral (0–100) e notas opcionais por matéria. O gráfico permite alternar entre evolução da nota geral e evolução de cada matéria.
- Os simulados usam LocalStorage como cache/fallback e uma nova aba `Mocks` no Google Sheets.
- O backend migra cabeçalhos por nome de coluna para preservar registros existentes ao adicionar `questionContext`.

Ao publicar esta versão, atualize também o `backend/Code.gs` no Google Apps Script e crie uma nova implantação/versão do Web App se necessário para que a sincronização de simulados chegue à planilha.

### Fluxo unificado de revisão (V1.1)
- Itens em **Revisões de hoje** ou **Atrasadas** abrem o mesmo formulário de sessão já em modo Revisão, com matéria e subtema preenchidos.
- Ao salvar, questões, acertos e duração entram nas estatísticas gerais e no banco de horas.
- A sessão fica vinculada à revisão por `reviewKey`; o resultado gera/atualiza o registro de revisão e calcula o próximo intervalo conforme desempenho, amostra e consistência.
- A revisão concluída deixa de aparecer como hoje/atrasada porque a agenda passa a usar a nova data calculada.
- Também é possível registrar manualmente uma sessão como Revisão; nesse caso a chave do tópico é criada automaticamente.


## V1.1.1 — Catálogo estruturado

Matérias e subtemas agora são cadastrados uma única vez e possuem IDs persistentes. Sessões e revisões guardam `subjectId`/`topicId`, os selects evitam variações de digitação e simulados reutilizam o catálogo de matérias. Renomear preserva vínculos; arquivar não apaga histórico. O backend sincroniza as abas `Subjects` e `Topics`.

## V1.2 — Motor de revisão adaptativa

A primeira revisão é sempre agendada em 3 dias. Somente sessões com contexto de revisão podem alterar intervalos. O avanço exige ao menos 20 questões e 90% de acerto, percorre um único estágio por revisão e continua em passos de 30 dias após 60, sem teto. Resultados entre 70% e 89,99% mantêm o intervalo; entre 60% e 69,99% regressam para no máximo 7 dias; abaixo de 60% regressam para 3 dias.
