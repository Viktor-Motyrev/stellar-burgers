/// <reference types="../support/index" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Перехватываем запрос на получение ингредиентов
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    
    // Перехватываем запрос на получение данных пользователя
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    
    // Перехватываем запрос на создание заказа
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

    // Устанавливаем моковые токены
    cy.setAuthTokens();

    // Переходим на страницу конструктора
    cy.visit('/');
    
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавить булку в конструктор', () => {
      // Добавление булок
      cy.get('[data-cy="ingredients-bun"]').first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      cy.get('[data-cy="constructor-bun-top"]').should('contain', 'Краторная булка N-200i (верх)');
      cy.get('[data-cy="constructor-bun-bottom"]').should('contain', 'Краторная булка N-200i (низ)');
    });

    it('должен добавить начинку в конструктор', () => {
      // Добавление начинок
      cy.get('[data-cy="ingredients-main"]').first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      cy.get('[data-cy="constructor-ingredients"]').should('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Модальные окна ингредиентов', () => {
    it('должен открыть модальное окно при клике на ингредиент', () => {
      cy.get('[data-cy="ingredient-link"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="ingredient-details"]').should('be.visible');
    });

    it('должен закрыть модальное окно по клику на крестик', () => {
      cy.get('[data-cy="ingredient-link"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('должен закрыть модальное окно по клику на оверлей', () => {
      cy.get('[data-cy="ingredient-link"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('должен успешно создать заказ', () => {
      // Собираем бургер
      cy.get('[data-cy="ingredients-bun"]').first().within(() => {
        cy.get('button').contains('Добавить').click();
      });
      
      cy.get('[data-cy="ingredients-main"]').first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      // Вызывается клик по кнопке «Оформить заказ»
      cy.get('[data-cy="order-button"]').click();

      // Ждем создания заказа
      cy.wait('@createOrder');

      // Проверяется, что модальное окно открылось и номер заказа верный
      cy.get('[data-cy="order-modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      // Закрывается модальное окно и проверяется успешность закрытия
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="order-modal"]').should('not.exist');

      // Проверяется, что конструктор пуст
      cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
      cy.get('[data-cy="constructor-empty-bun"]').should('be.visible');
      cy.get('[data-cy="constructor-empty-filling"]').should('be.visible');
    });
  });
});
