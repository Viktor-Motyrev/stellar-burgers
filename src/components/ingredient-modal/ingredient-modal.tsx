import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { ModalUI } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useModalNavigation } from '../../hooks/useModalNavigation';

export const IngredientModal: FC = () => {
  const { id } = useParams();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.items
  );
  const { handleModalClose } = useModalNavigation();

  const ingredientData = useMemo(
    () => ingredients.find((i) => i._id === id) || null,
    [ingredients, id]
  );

  const handleClose = () => {
    handleModalClose();
  };

  if (!ingredientData) {
    return null;
  }

  return (
    <ModalUI title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </ModalUI>
  );
};
