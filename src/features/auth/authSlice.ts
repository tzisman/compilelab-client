import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user.types'; 
import type { RootState } from '../../app/store';

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      
      state.user = user;
      state.token = token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },

    
    logout: (state) => {
      state.user = null;
      state.token = null;
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');

    },
  },
});

export const { setCredentials, logout } = authSlice.actions;


export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;