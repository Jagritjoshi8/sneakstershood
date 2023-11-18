import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  sellerProducts: [],
  fetchingStatus: null,
  fetchingError: null,
  creatingStatus: null,
  creatingError: null,
  sFetchingStatus: null,
  sFetchingErroe: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerProducts = createAsyncThunk(
  "products/getSellerProducts",
  async (sellerid, { rejectWithValue }) => {
    try {
      const sellerProductdata = await axios.get(
        `${url}/sneakers/getSellerProducts/${sellerid}`
      );

      return sellerProductdata?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    for (let pair of formData.entries()) {
      console.log(`actulformdata2:${pair[0]}: ${pair[1]}`);
    }
    try {
      const productdata = await axios.post(
        `${url}/sneakers/create-product/`,
        formData
      );

      return productdata.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          fetchingStatus: "success",
          items: action.payload,
        };
      } else return state;
    });
    builder.addCase(productsFetch.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        fetchingStatus: "rejected",
        fetchingError: action.payload,
      };
    });
    builder.addCase(createProduct.pending, (state, action) => {
      return { ...state, creatingStatus: "pending" };
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("New Product Created Successfully 💚 ");
        return {
          ...state,
          creatingStatus: "success",
          name: action.payload.name,
        };
      } else return state;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        creatingStatus: "rejected",
        creatingError: action.payload,
      };
    });

    builder.addCase(getSellerProducts.pending, (state, action) => {
      return { ...state, sFetchingStatus: "pending" };
    });
    builder.addCase(getSellerProducts.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          sFetchingStatus: "success",
          sellerProducts: action.payload.sellerProducts,
        };
      } else return state;
    });
    builder.addCase(getSellerProducts.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        sFetchingStatus: "rejected",
        sFetchingError: action.payload,
      };
    });
  },
});

export default productsSlice.reducer;
