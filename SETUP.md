# Configuração da nuvem e publicação

## PASSO 1 — Criar a planilha

1. Acesse Google Sheets e crie uma planilha vazia chamada `Study Tracker`.
2. Não crie abas ou colunas; o backend fará isso.

## PASSO 2 — Instalar o backend

1. Na planilha, clique em **Extensões > Apps Script**.
2. Apague o conteúdo de `Code.gs`.
3. Copie todo o conteúdo de `backend/Code.gs` deste projeto e cole no editor.
4. Clique em **Salvar**.

## PASSO 3 — Implantar

1. Clique em **Implantar > Nova implantação**.
2. Em **Selecionar tipo**, escolha **App da Web**.
3. Em **Executar como**, selecione **Eu**.
4. Em **Quem pode acessar**, selecione a opção sem login (`Qualquer pessoa`) para que GitHub Pages chame o endpoint.
5. Clique em **Implantar**.
6. Escolha sua conta, confira o acesso à planilha e clique em **Permitir**.
7. Copie a URL terminada em `/exec`.

Risco: qualquer pessoa que possua a URL pode ler ou gravar dados. Não a compartilhe nem registre dados sensíveis. Autenticação real exigiria uma arquitetura adicional.

## PASSO 4 — Ligar o frontend

1. Abra `js/config.js`.
2. Substitua `COLE_AQUI_A_URL_DO_APPS_SCRIPT` pela URL `/exec`.
3. Salve e recarregue o Study Tracker.
4. O indicador deve chegar a **Sincronizado**. Na primeira conexão, os dados locais serão migrados sem serem apagados.

## PASSO 5 — Testar

1. Crie uma sessão e confirme uma linha em `Sessions`.
2. Registre uma revisão e confirme uma linha em `Reviews` e uma sessão correspondente.
3. Edite e exclua um teste; recarregue e confirme que não reaparece.
4. Desative a internet, crie um registro, reative-a e clique no indicador para sincronizar.

## PASSO 6 — Publicar no GitHub Pages

1. Crie um repositório vazio no GitHub e envie esta pasta para a raiz.
2. Abra **Settings > Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione `main`, pasta `/(root)`, e clique em **Save**.
5. Aguarde a URL exibida nessa tela.

Após mudar `Code.gs`, use **Implantar > Gerenciar implantações > Editar > Nova versão** para preservar a URL.
