# Cypress API Automation for Trello

Demonstração técnica de automação de API com Cypress para exercitar o ciclo de vida de um board do Trello: criação do board, criação de lista e card, exclusão do card e limpeza do board.

> Este projeto executa operações reais na conta Trello associada às credenciais informadas. Use uma conta ou workspace destinado a testes.

## Escopo

A suíte em `cypress/e2e/automacao_trello.cy.js` executa, em sequência:

1. criação de um board com nome único;
2. criação de uma lista no board;
3. criação de um card na lista;
4. exclusão do card;
5. exclusão do board.

Um hook `after` tenta excluir o board caso uma etapa intermediária falhe depois de sua criação. Se o processo for interrompido abruptamente, a limpeza automática pode não ser executada; nesse caso, remova manualmente o board de teste.

## Stack

- Node.js
- JavaScript
- Cypress 15
- Trello REST API

## Pré-requisitos

- Node.js compatível com o campo `engines` do projeto (`^20.1.0 || ^22.0.0 || >=24.0.0`);
- npm;
- chave e token de API do Trello com acesso a uma conta de teste.

## Instalação

```bash
git clone https://github.com/micvianna/projetoTrelloAutomacao.git
cd projetoTrelloAutomacao
npm ci
```

## Configuração das credenciais

As credenciais não são armazenadas no repositório. O Cypress remove o prefixo `CYPRESS_` ao disponibilizar variáveis por `Cypress.env()`, portanto:

- `CYPRESS_TRELLO_API_KEY` fica disponível como `TRELLO_API_KEY`;
- `CYPRESS_TRELLO_API_TOKEN` fica disponível como `TRELLO_API_TOKEN`.

Use o arquivo de exemplo somente como referência:

```bash
cp .env.example .env
```

Preencha `.env` localmente e exporte as variáveis antes da execução:

```bash
set -a
. ./.env
set +a
npm test
```

Também é possível exportar as duas variáveis diretamente no terminal ou configurá-las no mecanismo de secrets da sua ferramenta de CI.

## Comandos

```bash
# Execução padrão em modo headless
npm test

# Alias explícito para execução headless
npm run test:headless

# Interface interativa do Cypress
npm run test:open

# Verificar a instalação/binário do Cypress
npm run cypress:verify
```

## Segurança

- Nunca coloque valores reais em `.env.example`, `cypress.env.json`, código-fonte, README, issues ou logs compartilhados.
- `.env`, variantes locais de `.env` e `cypress.env.json` estão no `.gitignore`.
- As requisições usam `log: false` para reduzir a exposição das credenciais no Command Log do Cypress.
- Trate screenshots, vídeos e logs de falha como potencialmente sensíveis antes de compartilhá-los.
- Se uma credencial for publicada, remova-a do código e revogue/rotacione-a no Trello; apagar o arquivo ou reescrever o Git não invalida uma credencial já exposta.

## Estrutura principal

```text
cypress.config.js                    Configuração E2E e URL-base da API
cypress/e2e/automacao_trello.cy.js   Cenário do ciclo de vida Trello
cypress/support/                     Suporte padrão do Cypress
.env.example                         Nomes das variáveis, sem valores
```

## Limitações

- A execução completa depende de credenciais válidas e de acesso à API do Trello.
- O projeto não usa mocks: cada execução autorizada cria e remove dados reais de teste.
- Interrupções abruptas podem impedir o hook de limpeza.
