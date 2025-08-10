import { FC, memo } from 'react';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import { addIngredient, setBun } from '../../services/slices/constructorSlice';
import { openIngredientModal } from '../../services/slices/ingredientModalSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    const handleIngredientClick = () => {
      dispatch(openIngredientModal(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        handleAdd={handleAdd}
        onIngredientClick={handleIngredientClick}
      />
    );
  }
);
