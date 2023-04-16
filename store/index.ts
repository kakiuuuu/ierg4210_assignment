import { configureStore } from '@reduxjs/toolkit'
import cartReducer  from './reducer/cart'
import UserReducer  from './reducer/user'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import expireReducer from 'redux-persist-expire';

const cartPersistConfig = {
  key: 'cart',
  storage,
}

const UserpersistConfig = {
  key: 'user',
  storage,
  transforms: [
    expireReducer('user', {
      expireSeconds: 60 * 60 * 24 * 3,
      expiredState: null,
      autoExpire: true,
      }),
    ]
}
export const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartReducer),
    user: persistReducer(UserpersistConfig, UserReducer),
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]

})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch