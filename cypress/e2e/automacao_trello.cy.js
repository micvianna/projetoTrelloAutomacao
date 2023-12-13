import config from "../config/config"

const { expect } = require("chai");

describe('Testes na API do Trello', () => {
  const API_KEY = config.API_KEY; // Insira sua chave de API no arquivo do Trello aqui 'cypress/config/config.js'
  const API_TOKEN = config.API_TOKEN; // Insira sua chave de token no arquivo do Trello aqui 'cypress/config/config.js' 
  const URL_TRELLO = config.URL_TRELLO; // Fixada a url da API do Trello no arquivo 'cypress/config/config.js

  let cardName = 'Novo Card Cypress';
  let boardId;
  let cardId;
  let listBoard;
  let newCardId;

  it('Cadastrar um board', () => {
    cy.request({
      method: 'POST',
      url: `${URL_TRELLO}/boards/?key=${API_KEY}&token=${API_TOKEN}`,
      body: {
        name: 'Novo Board',
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a requisição foi bem-sucedida
      boardId = response.body.id; // Armazena o ID do board para uso futuro
      cy.log(`Novo Board criado com sucesso! ID: ${boardId}`)
    });
  });

  it('Criação de Lista no Trello', ()=> {
    cy.request({
      method: 'POST',
      url: `${URL_TRELLO}/boards/${boardId}/lists?name=NovaLista&key=${API_KEY}&token=${API_TOKEN}`,
    }).then((response) =>{
      expect(response.status).to.eq(200);// Verifica se a requisição foi bem-sucedida
      expect(response.body).to.have.property('id');
      listBoard = response.body.id;// Armazena o ID da lista para uso futuro
      cy.log(`Novo Board criado com sucesso! ID: ${listBoard}`);
    });
  });

  it('Criar um novo card no board do Trello', () => {
    cy.request({
      method: 'POST',
      url: `${URL_TRELLO}/cards?key=${API_KEY}&token=${API_TOKEN}&name=${cardName}&idList=${listBoard}`,
      
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a requisição foi bem-sucedida
      cardId = response.body.id; // Armazena o ID do card para uso futuro
      expect(cardId).to.exist;  // Verifica se o card foi criado com sucesso
      cy.log(`Novo card criado com sucesso!`);// Log do ID do novo card
    });
  });

  it('Excluir um card', () => {
    cy.request({
      method: 'DELETE',
      url: `${URL_TRELLO}/cards/${cardId}?key=${API_KEY}&token=${API_TOKEN}`
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a requisição foi bem-sucedida
      cy.log(`Card excluido com sucesso!`);
    });
  });

  it('Excluir um board', () => {
    cy.request({
      method: 'DELETE',
      url: `${URL_TRELLO}/boards/${boardId}?key=${API_KEY}&token=${API_TOKEN}`
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a requisição foi bem-sucedida
      cy.log(`Board excluido com sucesso!`);
    });
  });
});