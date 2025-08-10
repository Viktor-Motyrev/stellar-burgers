import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { closeIngredientModal } from '../../services/slices/ingredientModalSlice';
import { ModalUI } from '@ui';
import { IngredientDetailsUI } from '@ui';

export const IngredientModal: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, ingredient } = useAppSelector(
    (state: RootState) => state.ingredientModal
  );

  const handleClose = () => {
    dispatch(closeIngredientModal());
  };

  if (!isOpen || !ingredient) {
    return null;
  }

  return (
    <ModalUI title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetailsUI ingredientData={ingredient} />
    </ModalUI>
  );
};
