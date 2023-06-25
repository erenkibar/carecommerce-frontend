import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import user from './user';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage
};

const reducer = combineReducers({
  user
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export { store, persistor };
