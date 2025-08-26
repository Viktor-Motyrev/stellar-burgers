/**
 * Константы для cypress селекторов
 */

export const SELECTORS = {
  // Ингредиенты
  INGREDIENT_LINK: '[data-cy="ingredient-link"]',
  INGREDIENTS_BUN: '[data-cy="ingredients-bun"]',
  INGREDIENTS_MAIN: '[data-cy="ingredients-main"]',
  INGREDIENT_DETAILS: '[data-cy="ingredient-details"]',

  // Конструктор
  CONSTRUCTOR_BUN_TOP: '[data-cy="constructor-bun-top"]',
  CONSTRUCTOR_BUN_BOTTOM: '[data-cy="constructor-bun-bottom"]',
  CONSTRUCTOR_INGREDIENTS: '[data-cy="constructor-ingredients"]',
  CONSTRUCTOR_EMPTY_BUN: '[data-cy="constructor-empty-bun"]',
  CONSTRUCTOR_EMPTY_FILLING: '[data-cy="constructor-empty-filling"]',

  // Модальные окна
  MODAL: '[data-cy="modal"]',
  MODAL_CLOSE_BUTTON: '[data-cy="modal-close-button"]',
  MODAL_OVERLAY: '[data-cy="modal-overlay"]',

  // Заказ
  ORDER_BUTTON: '[data-cy="order-button"]',
  ORDER_MODAL: '[data-cy="order-modal"]',
  ORDER_NUMBER: '[data-cy="order-number"]'
} as const;
