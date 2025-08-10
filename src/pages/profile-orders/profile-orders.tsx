import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => state.profileOrders.orders);

  useEffect(() => {
    // Загружаем заказы профиля при первом рендере
    dispatch(fetchProfileOrders());

    // Обновляем заказы каждые 30 секунд для имитации реального времени
    const interval = setInterval(() => {
      dispatch(fetchProfileOrders());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
