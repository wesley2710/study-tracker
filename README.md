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
