import ingredientModalReducer, {
  openIngredientModal,
  closeIngredientModal,
  IngredientModalState,
  initialState
} from '../ingredientModalSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredient: TIngredient = {
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
};

describe('ingredientModalSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(ingredientModalReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('должен обработать openIngredientModal', () => {
    const action = openIngredientModal(mockIngredient);
    const result = ingredientModalReducer(initialState, action);
    
    expect(result.isOpen).toBe(true);
    expect(result.ingredient).toEqual(mockIngredient);
  });

  test('должен обработать closeIngredientModal', () => {
    const stateWithOpenModal: IngredientModalState = {
      isOpen: true,
      ingredient: mockIngredient
    };
    
    const action = closeIngredientModal();
    const result = ingredientModalReducer(stateWithOpenModal, action);
    
    expect(result.isOpen).toBe(false);
    expect(result.ingredient).toBe(null);
  });
});
