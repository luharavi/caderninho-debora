# Caderninho da Débora

Agenda de manicure: clientes, horários, pacotes fechados e controle de pagamento,
com mensagens prontas para enviar pelo WhatsApp.

## Como usar

Abra o endereço no celular e escolha **Adicionar à tela de início** (Chrome) ou
**Compartilhar → Adicionar à Tela de Início** (Safari). Ele passa a abrir como
aplicativo, em tela cheia, e funciona sem internet.

## Onde ficam os dados

No próprio aparelho, no armazenamento do navegador. Nada é enviado para a
internet — nem para este repositório, que contém só o código da página.

Por isso o backup importa: em **Ajustes → Backup** dá para salvar um arquivo
`.json` com tudo (guarde no Drive ou mande para você mesmo no WhatsApp) e
restaurá-lo em outro aparelho. Há também **Exportar planilha**, que gera um
`.csv` para abrir no Excel ou no Google Sheets.

Apagar os dados de navegação do celular apaga a agenda. O backup é a rede de
segurança.

## Como funcionam os pacotes

Um ciclo são 4 atendimentos semanais no dia e hora fixos da cliente.

- **Pacote 15** — pé junto no 1º e no 3º atendimento.
- **Pacote 30** — pé junto só no 1º.

O pagamento é do ciclo inteiro. Quando o 4º atendimento acontece, o pacote
"vira" e aparece em **Hoje → Avisos** e em **Pagamentos** como *a receber*, com
a mensagem de cobrança pronta. Uma semana antes de fechar, o app já avisa.

## Cancelamentos

No horário, toque em **cancelou**:

- **Avisou antes** — você escolhe o novo dia e hora, nada é cobrado.
- **Cancelou em cima da hora** — vira *falta cobrada*: continua cobrada e, no
  pacote, consome um dos 4 atendimentos.

## Estrutura

Página única, sem dependências além das fontes do Google.

| Arquivo | O que é |
| --- | --- |
| `index.html` | o app inteiro (interface, lógica e armazenamento) |
| `manifest.webmanifest` | nome, cores e ícones da instalação |
| `sw.js` | cache para funcionar offline |
| `icone-*.png` | ícones da tela de início |
