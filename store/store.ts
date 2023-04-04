import { configureStore } from '@reduxjs/toolkit'
import cartReducer  from './reducer/cart'
import UserReducer  from './reducer/user'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig1 = {
  key: 'cart',
  storage,
}

const persistConfig2 = {
  key: 'user',
  storage,
}
export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig1, cartReducer),
    user: persistReducer(persistConfig2, UserReducer),
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]

})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch