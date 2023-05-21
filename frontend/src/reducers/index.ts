import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
// import userReducer from "./userSlice";
// Import other reducers as needed

const rootReducer = combineReducers({
  cart: cartReducer,
  //   user: userReducer,
  // Add other reducers here
});

export default rootReducer;
