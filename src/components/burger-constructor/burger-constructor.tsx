import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient, TOrder, TUser } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { createOrder, closeOrderModal } from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/constructorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ConstructorState } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const constructorItems = useAppSelector(
    (state: RootState) => state.burgerConstructor
  ) as unknown as ConstructorState;
  const orderRequest = useAppSelector(
    (state: RootState) => state.order.orderRequest
  ) as unknown as boolean;
  const orderModalData = useAppSelector(
    (state: RootState) => state.order.orderModalData
  ) as unknown as TOrder | null;
  const user = useAppSelector(
    (state: RootState) => state.user.user
  ) as unknown as TUser | null;

  // Сброс конструктора при успешном создании заказа
  useEffect(() => {
    if (orderModalData && !orderRequest) {
      dispatch(resetConstructor());
    }
  }, [orderModalData, orderRequest, dispatch]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(createOrder());
  };
  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModalHandler}
    />
  );
};
