import feedReducer, {
  fetchFeeds,
  FeedState,
  initialState
} from '../feedSlice';
import { TOrdersData } from '../../../utils/types';

const mockFeedData: TOrdersData = {
  orders: [
    {
      _id: '64c3b71c9b885a0001f8b7e9',
      status: 'done',
      name: 'Альфа-сахаридный астероидный бургер',
      createdAt: '2023-07-28T08:49:00.000Z',
      updatedAt: '2023-07-28T08:49:00.000Z',
      number: 13012,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
    }
  ],
  total: 13000,
  totalToday: 50
};

describe('feedSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchFeeds async thunk', () => {
    test('должен установить isLoading в true при pending', () => {
      const action = { type: fetchFeeds.pending.type };
      const result = feedReducer(initialState, action);
      
      expect(result.isLoading).toBe(true);
      expect(result.error).toBe(null);
    });

    test('должен записать данные в стор и установить isLoading в false при fulfilled', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedData
      };
      const result = feedReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.orders).toEqual(mockFeedData.orders);
      expect(result.total).toBe(mockFeedData.total);
      expect(result.totalToday).toBe(mockFeedData.totalToday);
      expect(result.error).toBe(null);
    });

    test('должен записать ошибку в стор и установить isLoading в false при rejected', () => {
      const errorMessage = 'Не удалось загрузить ленту';
      const action = {
        type: fetchFeeds.rejected.type,
        payload: errorMessage
      };
      const result = feedReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.orders).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalToday).toBe(0);
    });

    test('должен установить дефолтную ошибку при rejected без payload', () => {
      const action = {
        type: fetchFeeds.rejected.type,
        payload: undefined
      };
      const result = feedReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Ошибка загрузки ленты');
    });
  });
});
