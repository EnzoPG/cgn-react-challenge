import { configureStore } from '@reduxjs/toolkit';
import universitiesReducer from '../features/universities/universitiesSlice';

export const store = configureStore({
  reducer: {
    universities: universitiesReducer,
  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
