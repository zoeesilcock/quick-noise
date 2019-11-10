import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import appModeReducer from './features/appMode/appModeSlice';
import noiseReducer from './features/noise/noiseSlice';

export const reducer = combineReducers({
  appMode: appModeReducer,
  noise: noiseReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['appMode'],
}
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [...getDefaultMiddleware({
  serializableCheck: {
    // Avoid warning about non-serializable action payload in redux-persist.
    ignoredActions: ['persist/PERSIST']
  }
})];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

