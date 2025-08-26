import { store } from '../store';
import { RootState } from '../store';

describe('rootReducer', () => {
  test('должен правильно инициализироваться', () => {
    const state: RootState = store.getState();
    
    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: expect.any(Object),
      feed: expect.any(Object),
      user: expect.any(Object),
      profileOrders: expect.any(Object),
      orderDetails: expect.any(Object),
      ingredientModal: expect.any(Object),
      orderModal: expect.any(Object)
    });
  });

  test('все редьюсеры должны присутствовать в store', () => {
    const state = store.getState();
    
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('profileOrders');
    expect(state).toHaveProperty('orderDetails');
    expect(state).toHaveProperty('ingredientModal');
    expect(state).toHaveProperty('orderModal');
  });
});
