import { configureStore } from '@reduxjs/toolkit';
import adReducer from './adSlice';

export const store = configureStore({
  reducer: {
    ads: adReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;