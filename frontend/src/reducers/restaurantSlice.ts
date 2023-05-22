import { Restaurant } from './../interfaces';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RestaurantState {
  restaurantsData: Restaurant[];
  restaurantsLoading: boolean;
  restaurantsError: any;

  restaurantData: Restaurant | null;
  restaurantLoading: boolean;
  restaurantError: any;
}

const initialState: RestaurantState = {
  restaurantsData: [],
  restaurantsLoading: false,
  restaurantsError: null,

  restaurantData: null,
  restaurantLoading: false,
  restaurantError: null,
};

export const fetchRestaurants = createAsyncThunk<Restaurant[], void, {}>(
  'restaurants/fetchRestaurants',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchRestaurant = createAsyncThunk<Restaurant, void, {}>(
  'restaurants/fetchRestaurant',
  async (id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/restaurants/${id}`
      );
      console.log('api', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    restaurantsReset: (state) => {
      state.restaurantsData = [];
      state.restaurantsLoading = false;
      state.restaurantsError = null;
    },
    restaurantReset: (state) => {
      state.restaurantData = null;
      state.restaurantLoading = false;
      state.restaurantError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.restaurantsLoading = true;
      })
      .addCase(
        fetchRestaurants.fulfilled,
        (state, action: PayloadAction<Restaurant[]>) => {
          state.restaurantsLoading = false;
          state.restaurantsData = action.payload;
        }
      )
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.restaurantsLoading = false;
        state.restaurantsError = action.error;
      })
      .addCase(fetchRestaurant.pending, (state) => {
        state.restaurantLoading = true;
      })
      .addCase(
        fetchRestaurant.fulfilled,
        (state, action: PayloadAction<Restaurant>) => {
          state.restaurantLoading = false;
          state.restaurantData = action.payload;
        }
      )
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.restaurantLoading = false;
        state.restaurantError = action.error;
      });
  },
});

export const { restaurantsReset } = restaurantSlice.actions;
export default restaurantSlice.reducer;
