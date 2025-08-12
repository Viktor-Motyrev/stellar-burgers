import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../services/store';
import {
  openIngredientModal,
  closeIngredientModal
} from '../services/slices/ingredientModalSlice';
import {
  openOrderModal,
  closeOrderModal
} from '../services/slices/orderModalSlice';
import { TIngredient, TOrder } from '@utils-types';

export const useModalNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const navigateToIngredient = useCallback(
    (ingredient: TIngredient) => {
      // Если мы уже находимся на главной странице, открываем модальное окно
      // Иначе переходим на отдельную страницу
      const isOnMainPage = location.pathname === '/';

      if (isOnMainPage) {
        // Открываем модальное окно
        dispatch(openIngredientModal(ingredient));
      } else {
        // Переходим на отдельную страницу
        navigate(`/ingredients/${ingredient._id}`, {
          state: { background: location }
        });
      }
    },
    [navigate, location, dispatch]
  );

  const navigateToOrder = useCallback(
    (order: TOrder, basePath: string) => {
      // Определяем, находимся ли мы на странице с заказами
      const isOnOrdersPage =
        location.pathname === '/feed' ||
        location.pathname === '/profile/orders';

      if (isOnOrdersPage) {
        // Открываем модальное окно и обновляем URL
        dispatch(openOrderModal(order));
        navigate(`${basePath}/${order.number}`, {
          state: { background: location }
        });
      } else {
        // Переходим на отдельную страницу
        navigate(`${basePath}/${order.number}`, {
          state: { background: location }
        });
      }
    },
    [navigate, location, dispatch]
  );

  const handleModalClose = useCallback(() => {
    // Если есть background state, возвращаемся назад
    if (location.state?.background) {
      navigate(-1);
    }
  }, [navigate, location.state]);

  return {
    navigateToIngredient,
    navigateToOrder,
    handleModalClose
  };
};
