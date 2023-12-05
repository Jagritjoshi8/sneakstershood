import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  sellerProducts: [],
  deletedSellerProducts: [],
  fetchingStatus: null,
  fetchingError: null,
  creatingStatus: null,
  creatingError: null,
  sFetchingStatus: null,
  sFetchingError: null,
  deleteStatus: null,
  restoreStatus: null,
  editStatus: null,
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

export const getDeletedSellerProducts = createAsyncThunk(
  "products/getDeletedSellerProducts",
  async (sellerid, { rejectWithValue }) => {
    try {
      const sellerProductdata = await axios.get(
        `${url}/sneakers/getDeletedSellerProducts/${sellerid}`
      );

      return sellerProductdata?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const restoreDeletedProducts = createAsyncThunk(
  "products/restoreDeletedProducts",
  async (productid, { rejectWithValue }) => {
    try {
      const restoredProductdata = await axios.post(
        `${url}/sneakers/restoreProducts/${productid}`
      );

      return restoredProductdata?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    for (let pair of formData.entries()) {
    }
    try {
      const productdata = await axios.post(
        `${url}/sneakers/create-product/`,
        formData
      );

      return productdata.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ productId, updatedData }, { rejectWithValue }) => {
    try {
      const productdata = await axios.patch(
        `${url}/sneakers/${productId}`,
        updatedData
      );

      return productdata.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const softDeleteProduct = createAsyncThunk(
  "products/softDeleteProduct",
  async (productid, { rejectWithValue }) => {
    try {
      const deleteResponse = await axios.delete(`${url}/sneakers/${productid}`);

      return deleteResponse?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const hardDeleteProduct = createAsyncThunk(
  "products/hardDeleteProduct",
  async (productid, { rejectWithValue }) => {
    try {
      const deleteResponse = await axios.delete(
        `${url}/sneakers/hardDelete/${productid}`
      );

      return deleteResponse?.data;
    } catch (error) {
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
      return {
        ...state,
        sFetchingStatus: "rejected",
        sFetchingError: action.payload,
      };
    });

    builder.addCase(getDeletedSellerProducts.pending, (state, action) => {
      return { ...state, sFetchingStatus: "pending" };
    });
    builder.addCase(getDeletedSellerProducts.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          sFetchingStatus: "success",
          deletedSellerProducts: action.payload.sellerProducts,
        };
      } else return state;
    });
    builder.addCase(getDeletedSellerProducts.rejected, (state, action) => {
      return {
        ...state,
        sFetchingStatus: "rejected",
        sFetchingError: action.payload,
      };
    });
    builder.addCase(restoreDeletedProducts.pending, (state, action) => {
      return { ...state, restoreStatus: "pending" };
    });
    builder.addCase(restoreDeletedProducts.fulfilled, (state, action) => {
      if (action.payload) {
        const restored = action.payload.restoredProduct;
        toast.success(`"${restored.name}" Restored To Live 🤩`);
        const newdeletedProducts = state.deletedSellerProducts.filter(
          (item) => item._id !== restored._id
        );
        state.deletedSellerProducts = newdeletedProducts;
        state.items.push(restored);
        state.restoreStatus = "success";
      } else return state;
    });
    builder.addCase(restoreDeletedProducts.rejected, (state, action) => {
      return {
        ...state,
        restoreStatus: "rejected",
      };
    });

    builder.addCase(editProduct.pending, (state, action) => {
      return { ...state, editStatus: "pending" };
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Product Updated Successfully 💚 ");
        return {
          ...state,
          editStatus: "success",
        };
      } else return state;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      return {
        ...state,
        editStatus: "rejected",
      };
    });
    builder.addCase(softDeleteProduct.pending, (state, action) => {
      return { ...state, deleteStatus: "pending" };
    });
    builder.addCase(softDeleteProduct.fulfilled, (state, action) => {
      if (action.payload) {
        toast.error(
          `"${action.payload.deletedProduct.name}" Deleted From Live 😟`
        );
        console.log("sde", action.payload);
        const newItems = state.sellerProducts.filter(
          (item) => item._id !== action.payload.deletedProduct._id
        );
        state.sellerProducts = newItems ? newItems : [];

        state.deleteStatus = "success";
      } else return state;
    });
    builder.addCase(softDeleteProduct.rejected, (state, action) => {
      return {
        ...state,
        deleteStatus: "rejected",
      };
    });
    builder.addCase(hardDeleteProduct.pending, (state, action) => {
      return { ...state, deleteStatus: "pending" };
    });
    builder.addCase(hardDeleteProduct.fulfilled, (state, action) => {
      if (action.payload) {
        toast.error(
          `${action.payload.deletedProduct[0].name} Deleted Permanently`
        );
        console.log("hde", action.payload);
        const newItems = state.deletedSellerProducts.filter(
          (item) => item._id !== action.payload.deletedProduct[0]._id
        );
        state.deletedSellerProducts = newItems;
        state.deleteStatus = "success";
      } else return state;
    });
    builder.addCase(hardDeleteProduct.rejected, (state, action) => {
      return {
        ...state,
        deleteStatus: "rejected",
      };
    });
  },
});

export default productsSlice.reducer;
