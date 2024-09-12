import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@prisma/client';
import { RootState } from '..';
import { auth } from '@/services/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setLoading, setError, clearError, clearUser } = authSlice.actions;

export const register = (userData: { email: string; password: string; name: string }) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const user = await auth.register(userData);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const login = (userData: { email: string; password: string }) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const user = await auth.login(userData);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await auth.logout();
    dispatch(clearUser());
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;