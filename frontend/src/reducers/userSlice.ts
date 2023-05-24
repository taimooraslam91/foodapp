/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userString = localStorage.getItem("user");
const user = userString !== null ? JSON.parse(userString) : null;

interface UserState {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
}

const initialState: UserState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const userLogin = createAsyncThunk(
  "auth/Login",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/login`,
        user
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
