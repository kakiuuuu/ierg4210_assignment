import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducer'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}


export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer)
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]

})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch