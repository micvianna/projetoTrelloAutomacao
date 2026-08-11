const requireTrelloCredential = (name, environmentVariable) => {
  const value = Cypress.env(name);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Missing Trello credential. Set ${environmentVariable} before running the suite.`,
    );
  }

  return value;
};

describe("Trello API lifecycle", () => {
  let apiKey;
  let apiToken;
  let boardId;

  const trelloRequest = ({ method, url, qs = {}, ...options }) =>
    cy.request({
      method,
      url,
      qs: {
        ...qs,
        key: apiKey,
        token: apiToken,
      },
      log: false,
      ...options,
    });

  before(() => {
    apiKey = requireTrelloCredential(
      "TRELLO_API_KEY",
      "CYPRESS_TRELLO_API_KEY",
    );
    apiToken = requireTrelloCredential(
      "TRELLO_API_TOKEN",
      "CYPRESS_TRELLO_API_TOKEN",
    );
  });

  after(() => {
    if (!boardId) {
      return;
    }

    trelloRequest({
      method: "DELETE",
      url: `/1/boards/${boardId}`,
      failOnStatusCode: false,
    }).then(() => {
      boardId = undefined;
    });
  });

  it("creates and removes a board, list and card", () => {
    const runId = Date.now();
    let listId;
    let cardId;

    return trelloRequest({
      method: "POST",
      url: "/1/boards",
      qs: { name: `Cypress Trello API Test ${runId}` },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        boardId = response.body.id;

        return trelloRequest({
          method: "POST",
          url: `/1/boards/${boardId}/lists`,
          qs: { name: "Automated test list" },
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        listId = response.body.id;

        return trelloRequest({
          method: "POST",
          url: "/1/cards",
          qs: {
            idList: listId,
            name: "Automated test card",
          },
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        cardId = response.body.id;

        return trelloRequest({
          method: "DELETE",
          url: `/1/cards/${cardId}`,
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);

        return trelloRequest({
          method: "DELETE",
          url: `/1/boards/${boardId}`,
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        boardId = undefined;
      });
  });
});
