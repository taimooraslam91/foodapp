import { restaurants } from './../data/index';
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import restaurantReducer from './restaurantSlice';
// import userReducer from "./userSlice";
// Import other reducers as needed

const rootReducer = combineReducers({
  cart: cartReducer,
  restaurant: restaurantReducer,
  //   user: userReducer,
  // Add other reducers here
});

export default rootReducer;
