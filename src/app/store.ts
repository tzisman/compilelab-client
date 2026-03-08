import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // לדוגמה:
    // auth: authReducer,
    // courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;