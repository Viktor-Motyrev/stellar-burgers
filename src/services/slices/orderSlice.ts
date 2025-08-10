import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { RootState } from '../store';
import { resetConstructor } from './constructorSlice';

export type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const bunId = state.burgerConstructor.bun?._id;
      const ingredientsIds = state.burgerConstructor.ingredients.map(
        (i) => i._id
      );
      const payloadIds = bunId
        ? [bunId, ...ingredientsIds, bunId]
        : ingredientsIds;
      const res = await orderBurgerApi(payloadIds);
      return res.order;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Не удалось оформить заказ');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = (action.payload as string) || 'Ошибка оформления заказа';
      });
  }
});

export const { closeOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
