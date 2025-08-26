import ingredientsReducer, {
  fetchIngredients,
  setIngredients,
  IngredientsState,
  initialState
} from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  }
];

describe('ingredientsSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('должен обработать setIngredients', () => {
    const action = setIngredients(mockIngredients);
    const result = ingredientsReducer(initialState, action);
    
    expect(result.items).toEqual(mockIngredients);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(null);
  });

  describe('fetchIngredients async thunk', () => {
    test('должен установить isLoading в true при pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const result = ingredientsReducer(initialState, action);
      
      expect(result.isLoading).toBe(true);
      expect(result.error).toBe(null);
    });

    test('должен записать данные в стор и установить isLoading в false при fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const result = ingredientsReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.items).toEqual(mockIngredients);
      expect(result.error).toBe(null);
    });

    test('должен записать ошибку в стор и установить isLoading в false при rejected', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const action = {
        type: fetchIngredients.rejected.type,
        payload: errorMessage
      };
      const result = ingredientsReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.items).toEqual([]);
    });

    test('должен установить дефолтную ошибку при rejected без payload', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        payload: undefined
      };
      const result = ingredientsReducer(
        { ...initialState, isLoading: true },
        action
      );
      
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Ошибка загрузки ингредиентов');
    });
  });
});
