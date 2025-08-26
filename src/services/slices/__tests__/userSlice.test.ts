import userReducer, {
  register,
  login,
  logout,
  getUser,
  updateUser,
  setAuthChecked,
  UserState,
  initialState
} from '../userSlice';
import { TUser } from '../../../utils/types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('userSlice', () => {
  test('должен возвращать начальное состояние', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('должен обработать setAuthChecked', () => {
    const action = setAuthChecked(true);
    const result = userReducer(initialState, action);
    
    expect(result.isAuthChecked).toBe(true);
    expect(result.user).toBe(null);
    expect(result.error).toBe(null);
  });

  describe('register async thunk', () => {
    test('должен записать пользователя и установить isAuthChecked в true при fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: mockUser
      };
      const result = userReducer(initialState, action);
      
      expect(result.user).toEqual(mockUser);
      expect(result.isAuthChecked).toBe(true);
    });
  });

  describe('login async thunk', () => {
    test('должен записать пользователя и установить isAuthChecked в true при fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: mockUser
      };
      const result = userReducer(initialState, action);
      
      expect(result.user).toEqual(mockUser);
      expect(result.isAuthChecked).toBe(true);
    });
  });

  describe('getUser async thunk', () => {
    test('должен записать пользователя и установить isAuthChecked в true при fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const result = userReducer(initialState, action);
      
      expect(result.user).toEqual(mockUser);
      expect(result.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser async thunk', () => {
    test('должен обновить данные пользователя при fulfilled', () => {
      const stateWithUser: UserState = {
        user: mockUser,
        isAuthChecked: true,
        error: null
      };
      const updatedUser: TUser = {
        email: 'updated@example.com',
        name: 'Updated User'
      };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const result = userReducer(stateWithUser, action);
      
      expect(result.user).toEqual(updatedUser);
      expect(result.isAuthChecked).toBe(true);
    });
  });

  describe('logout async thunk', () => {
    test('должен очистить данные пользователя при fulfilled', () => {
      const stateWithUser: UserState = {
        user: mockUser,
        isAuthChecked: true,
        error: null
      };
      const action = { type: logout.fulfilled.type };
      const result = userReducer(stateWithUser, action);
      
      expect(result.user).toBe(null);
      expect(result.isAuthChecked).toBe(true);
    });
  });

  describe('rejected actions', () => {
    test('должен записать ошибку в стор и установить isAuthChecked в true при любом rejected action', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: register.rejected.type,
        payload: errorMessage
      };
      const result = userReducer(initialState, action);
      
      expect(result.error).toBe(errorMessage);
      expect(result.isAuthChecked).toBe(true);
      expect(result.user).toBe(null);
    });

    test('должен установить дефолтную ошибку при rejected без payload', () => {
      const action = {
        type: login.rejected.type,
        payload: undefined
      };
      const result = userReducer(initialState, action);
      
      expect(result.error).toBe('Ошибка запроса пользователя');
      expect(result.isAuthChecked).toBe(true);
    });
  });
});
