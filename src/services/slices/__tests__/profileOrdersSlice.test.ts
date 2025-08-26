import profileOrdersReducer, {
  fetchProfileOrders,
  ProfileOrdersState,
  initialState
} from '../profileOrdersSlice';
import { TOrder } from '../../../utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '64c3b71c9b885a0001f8b7e9',
    status: 'done',
    name: 'Альфа-сахаридный астероидный бургер',
    createdAt: '2023-07-28T08:49:00.000Z',
    updatedAt: '2023-07-28T08:49:00.000Z',
    number: 13012,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
  }
];

describe('profileOrdersSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(profileOrdersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchProfileOrders async thunk', () => {
    test('должен установить isLoading в true при pending', () => {
      const action = { type: fetchProfileOrders.pending.type };
      const result = profileOrdersReducer(initialState, action);
      
      expect(result.isLoading).toBe(true);
      expect(result.error).toBe(null);
    });

    test('должен записать данные в стор и установить isLoading в false при fulfilled', () => {
      const action = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const result = profileOrdersReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.orders).toEqual(mockOrders);
      expect(result.error).toBe(null);
    });

    test('должен записать ошибку в стор и установить isLoading в false при rejected', () => {
      const errorMessage = 'Не удалось загрузить заказы';
      const action = {
        type: fetchProfileOrders.rejected.type,
        payload: errorMessage
      };
      const result = profileOrdersReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.orders).toEqual([]);
    });

    test('должен установить дефолтную ошибку при rejected без payload', () => {
      const action = {
        type: fetchProfileOrders.rejected.type,
        payload: undefined
      };
      const result = profileOrdersReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Ошибка загрузки');
    });
  });
});
