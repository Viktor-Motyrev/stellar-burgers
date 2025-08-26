import orderDetailsReducer, {
  fetchOrderByNumber,
  clearCurrentOrder,
  OrderDetailsState,
  initialState
} from '../orderDetailsSlice';
import { TOrder } from '../../../utils/types';

const mockOrder: TOrder = {
  _id: '64c3b71c9b885a0001f8b7e9',
  status: 'done',
  name: 'Альфа-сахаридный астероидный бургер',
  createdAt: '2023-07-28T08:49:00.000Z',
  updatedAt: '2023-07-28T08:49:00.000Z',
  number: 13012,
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
};

describe('orderDetailsSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(orderDetailsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('должен обработать clearCurrentOrder', () => {
    const stateWithOrder: OrderDetailsState = {
      currentOrder: mockOrder,
      isLoading: false,
      error: 'Некоторая ошибка'
    };
    
    const action = clearCurrentOrder();
    const result = orderDetailsReducer(stateWithOrder, action);
    
    expect(result.currentOrder).toBe(null);
    expect(result.error).toBe(null);
    expect(result.isLoading).toBe(false);
  });

  describe('fetchOrderByNumber async thunk', () => {
    test('должен установить isLoading в true при pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const result = orderDetailsReducer(initialState, action);
      
      expect(result.isLoading).toBe(true);
      expect(result.error).toBe(null);
    });

    test('должен записать данные в стор и установить isLoading в false при fulfilled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const result = orderDetailsReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.currentOrder).toEqual(mockOrder);
      expect(result.error).toBe(null);
    });

    test('должен записать ошибку в стор и установить isLoading в false при rejected', () => {
      const errorMessage = 'Не удалось получить заказ';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        payload: errorMessage
      };
      const result = orderDetailsReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.currentOrder).toBe(null);
    });

    test('должен установить дефолтную ошибку при rejected без payload', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        payload: undefined
      };
      const result = orderDetailsReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Ошибка получения заказа');
    });
  });
});
