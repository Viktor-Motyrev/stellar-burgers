import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  handleAdd: () => void;
  onIngredientClick?: () => void;
  locationState?: { background: Location };
};
