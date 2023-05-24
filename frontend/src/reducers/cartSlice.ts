import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../interfaces";

// Retrieve cartItems from localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems");
const initialCartItems = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage)
  : [];

const initialState: CartState = {
  cartItems: initialCartItems,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product.id === newItem.product.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product.id === existingItem.product.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== itemId
      );
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        return item.product.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        return item.product.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
    },
    storeCartItems: (state) => {
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  reset,
  addToCart,
  storeCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
