import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useAppSelector((state) => state.feed.orders);
  const feed = {
    total: useAppSelector((state) => state.feed.total),
    totalToday: useAppSelector((state) => state.feed.totalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
