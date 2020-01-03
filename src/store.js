import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import appModeReducer from './features/appMode/appModeSlice';
import noiseReducer from './features/noise/noiseSlice';
import addRemoteReducer from './features/addRemote/addRemoteSlice';
import playerReducer from './features/player/playerSlice';
import remoteReducer from './features/remote/remoteSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['appMode'],
}
const playerPersistConfig = {
  key: 'player',
  storage,
  whitelist: ['id']
};
const remotePersistConfig = {
  key: 'remote',
  storage,
  whitelist: ['playerId']
};

export const reducer = combineReducers({
  appMode: appModeReducer,
  noise: noiseReducer,
  addRemote: addRemoteReducer,
  player: persistReducer(playerPersistConfig, playerReducer),
  remote: persistReducer(remotePersistConfig, remoteReducer),
});
const persistedReducer = persistReducer(rootPersistConfig, reducer);

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
