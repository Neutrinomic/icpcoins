import { configureStore } from '@reduxjs/toolkit';
import configReducer from './reducers/config';
import pairsReducer from './reducers/pairs';
import tokensReducer from './reducers/tokens';
import proposalsReducer from './reducers/proposals';
import uiReducer from "./reducers/ui";
import pageReducer from "./reducers/pages";

import { loadState, saveState } from './localStorage';

const preloadedState = {}; //loadState();

export const store = configureStore({
  preloadedState,
  reducer: {
    config: configReducer,
    pairs: pairsReducer,
    tokens: tokensReducer,
    proposals: proposalsReducer,
    ui: uiReducer,
    page: pageReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false
});

// setInterval(() => {
//   saveState(store.getState());
// }, 5000);
