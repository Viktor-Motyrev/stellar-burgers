import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import ingredientModalReducer from './slices/ingredientModalSlice';
import orderModalReducer from './slices/orderModalSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    feed: feedReducer,
    user: userReducer,
    profileOrders: profileOrdersReducer,
    orderDetails: orderDetailsReducer,
    ingredientModal: ingredientModalReducer,
    orderModal: orderModalReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
