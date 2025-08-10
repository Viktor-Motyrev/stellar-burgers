import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useAppSelector(
    (state: RootState) => state.user.user?.name || ''
  );
  return <AppHeaderUI userName={userName} />;
};
