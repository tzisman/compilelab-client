import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import authReducer from '../features/auth/authSlice';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { logout } from '../features/auth/authSlice';

export const globalErrorMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = (action.payload as { status: number | string })?.status;

    switch (status) {
      case 401:
        console.warn('Unauthorized - Redirecting to login...');
        dispatch(logout());
        window.location.href = '/login';
        break;

      case 403:
        alert("Access Denied: You don't have permission to perform this action.");
        break;

      case 404:
        window.location.href = '/404';
        break;

      case 500:
        window.location.href = '/error-500';
        break;

      case 'FETCH_ERROR':
        window.location.href = '/server-down';
        break;
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    
    auth: authReducer,
  },
  
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    
  
  devTools: true,
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;