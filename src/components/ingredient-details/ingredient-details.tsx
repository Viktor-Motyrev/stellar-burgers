import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { NotFound404 } from '@pages';
import { IngredientModal } from '@components';
import styles from '../app/app.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.items
  );
  const ingredientData = useMemo(
    () => ingredients.find((i) => i._id === id) || null,
    [ingredients, id]
  );

  // Если есть background state, значит мы пришли с другой страницы
  // и нужно показать модальное окно
  if (location.state?.background) {
    if (!ingredientData) {
      return <NotFound404 />;
    }
    return <IngredientModal />;
  }

  // Иначе показываем обычную страницу
  if (!ingredientData) {
    return <NotFound404 />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <h1 className={`text text_type_main-large ${styles.detailHeader}`}>
        Детали ингредиента
      </h1>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
