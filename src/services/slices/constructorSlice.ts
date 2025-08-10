import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = { ...action.payload, id: nanoid() };
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients.push({ ...action.payload, id: nanoid() });
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index <= 0 || index >= state.ingredients.length) return;
      const newArr = [...state.ingredients];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      state.ingredients = newArr;
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < 0 || index >= state.ingredients.length - 1) return;
      const newArr = [...state.ingredients];
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      state.ingredients = newArr;
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
