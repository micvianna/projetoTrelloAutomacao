
---

# Automação de Testes com Cypress - Integração com a API do Trello

Este repositório contém um projeto de automação desenvolvido com Cypress para executar testes automatizados na API do Trello. O principal propósito deste projeto é demonstrar como realizar operações de criação e exclusão de boards e cards no Trello por meio de testes automatizados.

## Configuração do Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) - Versão LTS (recomendada)
- [Cypress](https://www.cypress.io/) - Instalado como dependência de desenvolvimento (`npm install cypress --save-dev`)

### Configuração Inicial

1. Clone este repositório em sua máquina local:

```bash
git clone [https://github.com/micvianna/projetoTrelloAutomacao.git]
cd projetoTrelloAutomacao
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Configure as variáveis de ambiente:

- Abra o arquivo `cypress/config/config.js` e substitua `YOUR_API_KEY` e `YOUR_API_TOKEN` pelas suas chaves de API e token de acesso do Trello.

## Estrutura do Projeto
- `cypress/e2e/`- Diretorio com o fonte do projeto
- `cypress/support/` - Pasta para arquivos de suporte, como comandos e configurações personalizadas do Cypress.
- `cypress/config` - Arquivo de configuração do Cypress.

## Executando os Testes

Para executar os testes no modo de linha de comando:

```bash
npx cypress run
```
Isso iniciará a execução dos testes Cypress para interação com a API do Trello.

## Observações Importantes

- **Personalize as Credenciais:** Certifique-se de ajustar as chaves de API e tokens de acesso nas configurações dos testes conforme suas credenciais reais do Trello.
- **Cuidado com as Operações:** Testes que realizam operações de criação e exclusão podem afetar diretamente os dados na sua conta do Trello. Execute-os com cuidado e preferencialmente em ambientes de testes.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar sugestões, relatar problemas ou criar pull requests para melhorias neste projeto.

---

Este README serve como um guia inicial para começar a utilizar este projeto de automação com Cypress para interagir com a API do Trello. Personalize as instruções, inclua detalhes adicionais sobre como executar os testes e quaisquer outras informações relevantes para quem for utilizar ou contribuir para o projeto.



"In God there is truth, and if you believe, He shows."
