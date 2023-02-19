import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './reducers/tokens';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
  },
});
