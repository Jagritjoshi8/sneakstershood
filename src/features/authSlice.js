import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { url } from "./api";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import { clearCart } from "./cartSlice";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  profileimg: "",
  signupStatus: "",
  signupError: "",
  signinStatus: "",
  signinError: "",
  fpStatus: "",
  fpError: "",
  fpMsg: "",
  rpStatus: "",
  rpError: "",
  userLoaded: false,
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    for (let pair of formData.entries()) {
      console.log(`actulformdata2:${pair[0]}: ${pair[1]}`);
    }
    try {
      const userdata = await axios.post(`${url}/users/signup`, formData);

      localStorage.setItem("token", userdata.data.token);

      return userdata.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (values, { rejectWithValue }) => {
    try {
      const userdata = await axios.post(`${url}/users/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", userdata.data.token);

      return userdata.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (values, { rejectWithValue }) => {
    try {
      const userdata = await axios.post(`${url}/users/forgotPassword`, {
        email: values.email,
      });
      return userdata.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userId, resetData }, { rejectWithValue }) => {
    try {
      const reset = await axios.patch(
        `${url}/users/resetPassword/${userId}`,
        resetData
      );

      return reset.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const currenttoken = jwtDecode(token);
        return {
          ...state,
          token,
          _id: currenttoken.id,
          name: currenttoken.name,
          email: currenttoken.email,
          profileimg: currenttoken.profileimg,
          userLoaded: true,
        };
      }
    },
    signoutUser(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("wishlistItems");
      toast.error("Signed Out 💔");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        profileimg: "",
        signupStatus: "",
        signupError: "",
        signinStatus: "",
        signinError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state, action) => {
      return { ...state, signupStatus: "pending" };
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      if (action.payload) {
        const tokendata = jwtDecode(action.payload.token);
        toast.success("Signed Up Successfully 💚 ");
        return {
          ...state,
          token: action.payload.token,
          name: tokendata.name,
          email: tokendata.email,
          _id: tokendata.id,
          profileimg: tokendata.profileimg,
          signupStatus: "success",
          userLoaded: true,
        };
      } else return state;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      return {
        ...state,
        signupStatus: "rejected",
        signupError: action.payload,
      };
    });

    builder.addCase(signinUser.pending, (state, action) => {
      return { ...state, signinStatus: "pending" };
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      if (action.payload) {
        const tokendata = jwtDecode(action.payload.token);
        toast.success("Signed In Successfully 💚 ");
        return {
          ...state,
          token: action.payload.token,
          name: tokendata.name,
          email: tokendata.email,
          _id: tokendata.id,
          profileimg: tokendata.profileimg,
          signinStatus: "success",
          userLoaded: true,
        };
      } else return state;
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      return {
        ...state,
        signinStatus: "rejected",
        signinError: action.payload,
      };
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      return { ...state, fpStatus: "pending" };
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      return {
        ...state,
        fpStatus: "success",
        fpMsg: action.payload.msg,
      };
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      return {
        ...state,
        fpStatus: "rejected",
        fpError: action.payload,
      };
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      return { ...state, rpStatus: "pending" };
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      toast.success("Your Password is Reseted Successfully 🤩 ");
      return {
        ...state,
        rpStatus: "success",
      };
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      return {
        ...state,
        rpStatus: "rejected",
        rpError: action.payload,
      };
    });
  },
});

export const { loadUser, signoutUser } = authSlice.actions;
export default authSlice.reducer;
