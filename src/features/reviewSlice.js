import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { url } from "./api";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

const initialState = {
  allReviews: [],
  postingStatus: "",
  postingError: "",
  gettingStatus: "",
  gettingError: "",
};

export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    //console.log("kk", productId, reviewData);
    // for (let pair of formData.entries()) {
    //   console.log(`actulformdata2:${pair[0]}: ${pair[1]}`);
    // }
    try {
      const review = await axios.post(
        `${url}/comments/${productId}`,
        reviewData
      );
      //   localStorage.setItem("token", userdata.data.token);
      return review.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const ProductReviews = await axios.get(
        `${url}/comments/getAllComments/${productId}`
      );

      //   localStorage.setItem("token", userdata.data.token);

      return ProductReviews?.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addReview.pending, (state, action) => {
      return { ...state, postingStatus: "pending" };
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("review posted Successfully 💚 ");
        state.allReviews.push(action.payload.review);
        state.postingStatus = "success";
      } else return state;
    });
    builder.addCase(addReview.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        postingStatus: "rejected",
        postingError: "Rating is Required",
      };
    });

    builder.addCase(getProductReviews.pending, (state, action) => {
      return { ...state, gettingStatus: "pending" };
    });
    builder.addCase(getProductReviews.fulfilled, (state, action) => {
      if (action.payload) {
        state.allReviews = action.payload.productReviews;
        state.gettingStatus = "success";
      } else return state;
    });
    builder.addCase(getProductReviews.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        gettingStatus: "rejected",
        gettingError: "Review is Not Fetched Appropriately",
      };
    });
  },
});

//  export const { addReview} = reviewSlice.actions;
export default reviewSlice.reducer;
