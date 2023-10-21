import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { url } from "./api";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  signupStatus: "",
  signupError: "",
  signinStatus: "",
  signinError: "",
  userLoaded: false,
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (values, { rejectWithValue }) => {
    try {
      const userdata = await axios.post(`${url}/users/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        age: values.age,
        gender: values.gender,
        phonenumber: values.phonenumber,
        address: values.address,
      });

      localStorage.setItem("token", userdata.data.token);

      return userdata.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state, action) => {
      return { ...state, signupStatus: "pending" };
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      if (action.payload) {
        const tokendata = jwtDecode(action.payload.token);
        toast.success("Signed Up Successfully");
        return {
          ...state,
          token: action.payload.token,
          name: action.payload.name,
          email: action.payload.email,
          id: tokendata.id,
          _id: action.payload._id,
          signupStatus: "success",
        };
      } else return state;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        signupStatus: "rejected",
        signupError: action.payload,
      };
    });
  },
});

export default authSlice.reducer;
