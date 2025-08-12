import { FC, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { closeOrderModal } from '../../services/slices/orderModalSlice';
import { ModalUI } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import {
  fetchOrderByNumber,
  clearCurrentOrder
} from '../../services/slices/orderDetailsSlice';
import { useModalNavigation } from '../../hooks/useModalNavigation';
import { useLocation, useParams } from 'react-router-dom';

export const OrderModal: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { number } = useParams();
  const { isOpen, order } = useAppSelector(
    (state: RootState) => state.orderModal
  );
  const orderData = useAppSelector(
    (state: RootState) => state.orderDetails.currentOrder
  );
  const ingredients: TIngredient[] = useAppSelector(
    (state: RootState) => state.ingredients.items
  );
  const { handleModalClose } = useModalNavigation();

  // Определяем, нужно ли показать модальное окно
  const shouldShowModal = isOpen || location.state?.background;

  useEffect(() => {
    if (shouldShowModal && number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, shouldShowModal, number]);

  const handleClose = () => {
    dispatch(closeOrderModal());
    dispatch(clearCurrentOrder());
    handleModalClose();
  };

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    } as any; // Временно используем any для обхода проблем с типизацией
  }, [orderData, ingredients]);

  if (!shouldShowModal || !orderData || !orderInfo) {
    return null;
  }

  return (
    <ModalUI
      title={`Заказ #${String(orderData.number).padStart(6, '0')}`}
      onClose={handleClose}
    >
      <OrderInfoUI orderInfo={orderInfo} />
    </ModalUI>
  );
};
