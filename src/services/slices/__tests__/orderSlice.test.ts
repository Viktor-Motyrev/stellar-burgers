import orderReducer, {
  createOrder,
  closeOrderModal,
  OrderState,
  initialState
} from '../orderSlice';
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

describe('orderSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('должен обработать closeOrderModal', () => {
    const stateWithData: OrderState = {
      orderRequest: false,
      orderModalData: mockOrder,
      error: 'Некоторая ошибка'
    };
    
    const action = closeOrderModal();
    const result = orderReducer(stateWithData, action);
    
    expect(result.orderModalData).toBe(null);
    expect(result.error).toBe(null);
    expect(result.orderRequest).toBe(false);
  });

  describe('createOrder async thunk', () => {
    test('должен установить orderRequest в true при pending', () => {
      const action = { type: createOrder.pending.type };
      const result = orderReducer(initialState, action);
      
      expect(result.orderRequest).toBe(true);
      expect(result.error).toBe(null);
    });

    test('должен записать данные в стор и установить orderRequest в false при fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const result = orderReducer(
        { ...initialState, orderRequest: true },
        action
      );
      
      expect(result.orderRequest).toBe(false);
      expect(result.orderModalData).toEqual(mockOrder);
      expect(result.error).toBe(null);
    });

    test('должен записать ошибку в стор и установить orderRequest в false при rejected', () => {
      const errorMessage = 'Не удалось оформить заказ';
      const action = {
        type: createOrder.rejected.type,
        payload: errorMessage
      };
      const result = orderReducer(
        { ...initialState, orderRequest: true },
        action
      );
      
      expect(result.orderRequest).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.orderModalData).toBe(null);
    });

    test('должен установить дефолтную ошибку при rejected без payload', () => {
      const action = {
        type: createOrder.rejected.type,
        payload: undefined
      };
      const result = orderReducer(
        { ...initialState, orderRequest: true },
        action
      );
      
      expect(result.orderRequest).toBe(false);
      expect(result.error).toBe('Ошибка оформления заказа');
    });
  });
});
