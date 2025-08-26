/// <reference types="../support/index" />

import { SELECTORS } from '../support/selectors';

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
      cy.get(SELECTORS.INGREDIENTS_BUN).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('contain', 'Краторная булка N-200i (верх)');
      cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('contain', 'Краторная булка N-200i (низ)');
    });

    it('должен добавить начинку в конструктор', () => {
      // Добавление начинок
      cy.get(SELECTORS.INGREDIENTS_MAIN).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS).should('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Модальные окна ингредиентов', () => {
    it('должен открыть модальное окно при клике на ингредиент', () => {
      cy.get(SELECTORS.INGREDIENT_LINK).first().click();
      cy.get(SELECTORS.MODAL).should('be.visible');
      cy.get(SELECTORS.INGREDIENT_DETAILS).should('be.visible');
    });

    it('должен закрыть модальное окно по клику на крестик', () => {
      cy.get(SELECTORS.INGREDIENT_LINK).first().click();
      cy.get(SELECTORS.MODAL).should('be.visible');

      cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
      cy.get(SELECTORS.MODAL).should('not.exist');
    });

    it('должен закрыть модальное окно по клику на оверлей', () => {
      cy.get(SELECTORS.INGREDIENT_LINK).first().click();
      cy.get(SELECTORS.MODAL).should('be.visible');

      cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });
      cy.get(SELECTORS.MODAL).should('not.exist');
    });

    it('должен закрыть модальное окно по нажатию клавиши Escape', () => {
      cy.get(SELECTORS.INGREDIENT_LINK).first().click();
      cy.get(SELECTORS.MODAL).should('be.visible');

      cy.get('body').type('{esc}');
      cy.get(SELECTORS.MODAL).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('должен успешно создать заказ', () => {
      // Собираем бургер
      cy.get(SELECTORS.INGREDIENTS_BUN).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });
      
      cy.get(SELECTORS.INGREDIENTS_MAIN).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      // Вызывается клик по кнопке «Оформить заказ»
      cy.get(SELECTORS.ORDER_BUTTON).click();

      // Ждем создания заказа
      cy.wait('@createOrder');

      // Проверяется, что модальное окно открылось и номер заказа верный
      cy.get(SELECTORS.ORDER_MODAL).should('be.visible');
      cy.get(SELECTORS.ORDER_NUMBER).should('contain', '12345');

      // Закрывается модальное окно и проверяется успешность закрытия
      cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
      cy.get(SELECTORS.ORDER_MODAL).should('not.exist');

      // Проверяется, что конструктор пуст
      cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('not.exist');
      cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
      cy.get(SELECTORS.CONSTRUCTOR_EMPTY_BUN).should('be.visible');
      cy.get(SELECTORS.CONSTRUCTOR_EMPTY_FILLING).should('be.visible');
    });

    it('должен закрыть модальное окно заказа по нажатию клавиши Escape', () => {
      // Собираем бургер
      cy.get(SELECTORS.INGREDIENTS_BUN).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });
      
      cy.get(SELECTORS.INGREDIENTS_MAIN).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      // Вызывается клик по кнопке «Оформить заказ»
      cy.get(SELECTORS.ORDER_BUTTON).click();

      // Ждем создания заказа
      cy.wait('@createOrder');

      // Проверяется, что модальное окно открылось
      cy.get(SELECTORS.ORDER_MODAL).should('be.visible');

      // Закрываем модальное окно по Escape
      cy.get('body').type('{esc}');
      cy.get(SELECTORS.ORDER_MODAL).should('not.exist');

      // Проверяется, что конструктор пуст
      cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('not.exist');
      cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
      cy.get(SELECTORS.CONSTRUCTOR_EMPTY_BUN).should('be.visible');
      cy.get(SELECTORS.CONSTRUCTOR_EMPTY_FILLING).should('be.visible');
    });
  });
});
