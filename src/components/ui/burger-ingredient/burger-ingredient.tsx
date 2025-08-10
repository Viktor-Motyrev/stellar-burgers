import React, { FC, memo } from 'react';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, onIngredientClick, locationState }) => {
    const { image, price, name, _id } = ingredient;

    // Если есть onIngredientClick, используем его для модального окна
    if (onIngredientClick) {
      return (
        <li className={styles.container}>
          <div
            className={styles.article}
            onClick={onIngredientClick}
            style={{ cursor: 'pointer' }}
          >
            {count && <Counter count={count} />}
            <img
              className={styles.img}
              src={image}
              alt='картинка ингредиента.'
            />
            <div className={`${styles.cost} mt-2 mb-2`}>
              <p className='text text_type_digits-default mr-2'>{price}</p>
              <CurrencyIcon type='primary' />
            </div>
            <p className={`text text_type_main-default ${styles.text}`}>
              {name}
            </p>
          </div>
          <AddButton
            text='Добавить'
            onClick={handleAdd}
            extraClass={`${styles.addButton} mt-8`}
          />
        </li>
      );
    }

    // Иначе используем старый подход с Link для stories
    return (
      <li className={styles.container}>
        <div className={styles.article}>
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </div>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
