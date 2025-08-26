import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setBun,
  resetConstructor,
  ConstructorState,
  initialState
} from '../constructorSlice';
import { TConstructorIngredient } from '../../../utils/types';

const mockIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: 'test-id-1',
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

const mockFilling: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: 'test-id-2',
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
};

const mockSauce: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  id: 'test-id-3',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
};

describe('constructorSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('должен обработать setBun', () => {
    const action = setBun(mockIngredient);
    const result = constructorReducer(initialState, action);
    
    expect(result.bun).toEqual(mockIngredient);
  });

  test('должен обработать addIngredient', () => {
    const action = addIngredient(mockFilling);
    const result = constructorReducer(initialState, action);
    
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual(mockFilling);
  });

  test('должен обработать removeIngredient', () => {
    const stateWithIngredients: ConstructorState = {
      bun: null,
      ingredients: [mockFilling, mockSauce]
    };
    
    const action = removeIngredient('test-id-2');
    const result = constructorReducer(stateWithIngredients, action);
    
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0].id).toBe('test-id-3');
  });

  test('должен обработать moveIngredientUp', () => {
    const stateWithIngredients: ConstructorState = {
      bun: null,
      ingredients: [mockFilling, mockSauce]
    };
    
    const action = moveIngredientUp(1);
    const result = constructorReducer(stateWithIngredients, action);
    
    expect(result.ingredients[0].id).toBe('test-id-3');
    expect(result.ingredients[1].id).toBe('test-id-2');
  });

  test('должен обработать moveIngredientDown', () => {
    const stateWithIngredients: ConstructorState = {
      bun: null,
      ingredients: [mockFilling, mockSauce]
    };
    
    const action = moveIngredientDown(0);
    const result = constructorReducer(stateWithIngredients, action);
    
    expect(result.ingredients[0].id).toBe('test-id-3');
    expect(result.ingredients[1].id).toBe('test-id-2');
  });

  test('moveIngredientUp не должен изменять состояние при некорректном индексе', () => {
    const stateWithIngredients: ConstructorState = {
      bun: null,
      ingredients: [mockFilling, mockSauce]
    };
    
    const action1 = moveIngredientUp(0);
    const result1 = constructorReducer(stateWithIngredients, action1);
    expect(result1).toEqual(stateWithIngredients);
    
    const action2 = moveIngredientUp(5);
    const result2 = constructorReducer(stateWithIngredients, action2);
    expect(result2).toEqual(stateWithIngredients);
  });

  test('moveIngredientDown не должен изменять состояние при некорректном индексе', () => {
    const stateWithIngredients: ConstructorState = {
      bun: null,
      ingredients: [mockFilling, mockSauce]
    };
    
    const action1 = moveIngredientDown(1);
    const result1 = constructorReducer(stateWithIngredients, action1);
    expect(result1).toEqual(stateWithIngredients);
    
    const action2 = moveIngredientDown(-1);
    const result2 = constructorReducer(stateWithIngredients, action2);
    expect(result2).toEqual(stateWithIngredients);
  });

  test('должен обработать resetConstructor', () => {
    const stateWithData: ConstructorState = {
      bun: mockIngredient,
      ingredients: [mockFilling, mockSauce]
    };
    
    const action = resetConstructor();
    const result = constructorReducer(stateWithData, action);
    
    expect(result).toEqual(initialState);
  });
});
