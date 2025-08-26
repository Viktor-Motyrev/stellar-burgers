/// <reference types="cypress" />

// Команда для установки токена авторизации
Cypress.Commands.add('setAuthTokens', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'mock-refresh-token');
  });
  cy.setCookie('accessToken', 'Bearer mock-access-token');
});
