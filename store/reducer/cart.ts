import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface appState {
  cartItems: { pid: number, quantity: number, name: string, price: number }[]
}

const initialState: appState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const { pid } = action.payload;
      const existingProduct = state.cartItems.find((item) => item.pid === pid);
      if (existingProduct) {
        existingProduct.quantity += 1; // increase quantity
      } else {
        state.cartItems.push(action.payload); // add new product
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex((item) => item.pid === action.payload);
      state.cartItems.splice(index, 1);
    },
    changeQuantity: (state, action: PayloadAction<{ pid: number, quantity: number }>) => {
      const { pid, quantity } = action.payload;
      const existingProduct = state.cartItems.find((item) => item.pid === pid);
      if (existingProduct) {
        existingProduct.quantity = quantity; // update quantity
        if (quantity <= 0) {
          const index = state.cartItems.findIndex((item) => item.pid === pid);
          state.cartItems.splice(index, 1); // remove item from cart if quantity is non-positive
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;
export const getTotalPrice = (state: RootState)=> {
  const totalPrice = state.cart.cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);
  return totalPrice.toFixed(2);
}
export const selectCart = (state: RootState) => state.cart.cartItems
export default cartSlice.reducer;
