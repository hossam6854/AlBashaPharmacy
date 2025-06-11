import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'pharmacy',
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
