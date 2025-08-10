import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.items
  );
  const ingredientData = useMemo(
    () => ingredients.find((i) => i._id === id) || null,
    [ingredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
