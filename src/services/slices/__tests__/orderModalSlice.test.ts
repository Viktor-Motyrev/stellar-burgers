import orderModalReducer, {
  openOrderModal,
  closeOrderModal,
  OrderModalState,
  initialState
} from '../orderModalSlice';
import { TOrder } from '../../../utils/types';

const mockOrder: TOrder = {
  _id: '64c3b71c9b885a0001f8b7e9',
  status: 'done',
  name: 'Альфа-сахаридный астероидный бургер',
  createdAt: '2023-07-28T08:49:00.000Z',
  updatedAt: '2023-07-28T08:49:00.000Z',
  number: 13012,
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
};

describe('orderModalSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(orderModalReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('должен обработать openOrderModal', () => {
    const action = openOrderModal(mockOrder);
    const result = orderModalReducer(initialState, action);
    
    expect(result.isOpen).toBe(true);
    expect(result.order).toEqual(mockOrder);
  });

  test('должен обработать closeOrderModal', () => {
    const stateWithOpenModal: OrderModalState = {
      isOpen: true,
      order: mockOrder
    };
    
    const action = closeOrderModal();
    const result = orderModalReducer(stateWithOpenModal, action);
    
    expect(result.isOpen).toBe(false);
    expect(result.order).toBe(null);
  });
});
