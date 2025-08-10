import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => state.feed.orders);
  const isLoading = useAppSelector((state: any) => state.feed.isLoading);

  useEffect(() => {
    // Загружаем ленту при первом рендере
    dispatch(fetchFeeds());

    // Обновляем ленту каждые 30 секунд для имитации реального времени
    const interval = setInterval(() => {
      dispatch(fetchFeeds());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
