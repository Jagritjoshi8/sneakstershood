import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { url } from "./api";

const initialState = {
  orderDetails: [],
  status: null,
  error: null,
};

export const getUserOrder = createAsyncThunk(
  "order/getUserOrder",
  async (userid, { rejectWithValue }) => {
    try {
      const userOrder = await axios.get(
        `${url}/payments/getuserorder/${userid}`
      );

      return userOrder?.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserOrder.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUserOrder.fulfilled]: (state, action) => {
      state.status = "success";
      state.orderDetails = action.payload;
    },
    [getUserOrder.rejected]: (state, action) => {
      state.status = "rejected";
      state.orderDetails = [];
      state.error = action.payload;
    },
  },
});

export default orderSlice.reducer;
