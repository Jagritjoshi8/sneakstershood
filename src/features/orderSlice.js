import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "./api";

const initialState = {
  orderDetails: [],
  uStatus: null,
  uError: null,
  sellerOrderDetails: [],
  sStatus: null,
  sError: null,
  updateStatus: null,
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

export const getSellerOrder = createAsyncThunk(
  "order/getSellerOrder",
  async (sellerid, { rejectWithValue }) => {
    try {
      const sellerOrder = await axios.get(
        `${url}/payments/getsellerorder/${sellerid}`
      );

      return sellerOrder?.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, updatedData }, { rejectWithValue }) => {
    try {
      const updateOrderdata = await axios.patch(
        `${url}/payments/${orderId}`,
        updatedData
      );

      return updateOrderdata.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrder.pending, (state, action) => {
      return { ...state, uStatus: "pending" };
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.orderDetails = action.payload;
        state.uStatus = "success";
      } else return state;
    });
    builder.addCase(getUserOrder.rejected, (state, action) => {
      return {
        ...state,
        uStatus: "rejected",
        uError: "Rating is Required",
      };
    });

    builder.addCase(getSellerOrder.pending, (state, action) => {
      return { ...state, sStatus: "pending" };
    });
    builder.addCase(getSellerOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.sellerOrderDetails = action.payload;
        state.sStatus = "success";
      } else return state;
    });
    builder.addCase(getSellerOrder.rejected, (state, action) => {
      return {
        ...state,
        sStatus: "rejected",
        sError: "Rating is Required",
      };
    });
    builder.addCase(updateOrder.pending, (state, action) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      if (action.payload.orderStatus === "Delivered") {
        toast.success(`Order ${action.payload.orderStatus} Successfully 💚 `);
      } else {
        toast(`💛 Order ${action.payload.orderStatus} Successfully`);
      }

      return {
        ...state,
        updateStatus: "success",
      };
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
      };
    });
  },
});

export default orderSlice.reducer;
