import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { url } from "./api";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

const initialState = {
  sellerBlogs: [],
  uploadStatus: "",
  uploadError: "",
  gettingStatus: "",
  gettingError: "",
};

export const uploadBlog = createAsyncThunk(
  "sellerblog/uploadBlog",
  async (values, { rejectWithValue }) => {
    try {
      const blogData = await axios.post(`${url}/sellerblogs/create`, {
        sellerLogo: values.sellerLogoimg,
        sellerName: values.sellerName,
        blogImageUrl: values.imageUrl,
        blogPosterUrl: values.posterImageUrl,
        blogHashTags: values.hashTags,
        blogContent: values.blogContent,
      });
      return blogData.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllBlogs = createAsyncThunk(
  "sellerblog/getAllBlogs",
  async (id = null, { rejectWithValue }) => {
    try {
      const allBlogsData = await axios.get(`${url}/sellerblogs/getAllBlogs`);

      return allBlogsData?.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const sellerblogSlice = createSlice({
  name: "sellerblog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadBlog.pending, (state, action) => {
      return { ...state, uploadStatus: "pending" };
    });
    builder.addCase(uploadBlog.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Blog Uploaded Successfully 💚 ");
        state.sellerBlogs.push(action.payload);
        state.uploadStatus = "success";
      } else return state;
    });
    builder.addCase(uploadBlog.rejected, (state, action) => {
      return {
        ...state,
        uploadStatus: "rejected",
        uploadError: "All Fields are Required",
      };
    });

    builder.addCase(getAllBlogs.pending, (state, action) => {
      return { ...state, gettingStatus: "pending" };
    });
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("getAllBlogss", action.payload);
        state.sellerBlogs = action.payload.blogPosts;
        state.gettingStatus = "success";
      } else return state;
    });
    builder.addCase(getAllBlogs.rejected, (state, action) => {
      return {
        ...state,
        gettingStatus: "rejected",
        gettingError: "something went wrong",
      };
    });
  },
});

export default sellerblogSlice.reducer;
