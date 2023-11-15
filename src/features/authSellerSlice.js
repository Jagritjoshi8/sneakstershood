import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { url } from "./api";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

const initialState = {
  sellertoken: localStorage.getItem("sellertoken"),
  businessName: "",
  businessEmail: "",
  _id: "",
  logoimg: "",
  signupStatus: "",
  signupError: "",
  signinStatus: "",
  signinError: "",
  sellerLoaded: false,
};

export const signupSeller = createAsyncThunk(
  "authseller/signupSeller",
  async (formData, { rejectWithValue }) => {
    for (let pair of formData.entries()) {
      console.log(`actulformdata2:${pair[0]}: ${pair[1]}`);
    }
    try {
      const sellerdata = await axios.post(
        `${url}/sellers/signup-seller`,
        formData
      );

      localStorage.setItem("sellertoken", sellerdata.data.token);

      return sellerdata.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signinSeller = createAsyncThunk(
  "authseller/signinSeller",
  async (values, { rejectWithValue }) => {
    try {
      const sellerdata = await axios.post(`${url}/sellers/signin-seller`, {
        businessEmail: values.businessEmail,
        password: values.password,
      });

      localStorage.setItem("sellertoken", sellerdata.data.token);

      return sellerdata.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSellerSlice = createSlice({
  name: "authseller",
  initialState,
  reducers: {
    loadSeller(state, action) {
      const sellertoken = state.sellertoken;
      if (sellertoken) {
        const currenttoken = jwtDecode(sellertoken);
        return {
          ...state,
          sellertoken,
          _id: currenttoken.id,
          businessName: currenttoken.businesName,
        businessEmail: currenttoken.businessEmail,
          logoimg: currenttoken.logoimg,
          sellerLoaded: true,
        };
      }
    },
    signoutSeller(state, action) {
      localStorage.removeItem("sellertoken");
      toast.error("Signed Out 💔");
      return {
        ...state,
        sellertoken: "",
        businessName: "",
        businessEmail: "",
        _id: "",
        logoimg: "",
        signupStatus: "",
        signupError: "",
        signinStatus: "",
        signinError: "",
        sellerLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupSeller.pending, (state, action) => {
      return { ...state, signupStatus: "pending" };
    });
    builder.addCase(signupSeller.fulfilled, (state, action) => {
      if (action.payload) {
        const tokendata = jwtDecode(action.payload.token);
        toast.success("Signed Up Successfully 💚 ");
        return {
          ...state,
          sellertoken: action.payload.token,
          businessName: tokendata.businessName,
          businessEmail: tokendata.businessEmail,
          _id: tokendata.id,
          logoimg: tokendata.logoimg,
          signupStatus: "success",
          sellerLoaded: true,
        };
      } else return state;
    });
    builder.addCase(signupSeller.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        signupStatus: "rejected",
        signupError: action.payload,
      };
    });

    builder.addCase(signinSeller.pending, (state, action) => {
      return { ...state, signinStatus: "pending" };
    });
    builder.addCase(signinSeller.fulfilled, (state, action) => {
      if (action.payload) {
        const tokendata = jwtDecode(action.payload.token);
        toast.success("Signed In Successfully 💚 ");
        return {
          ...state,
          sellertoken: action.payload.token,
          businessName: tokendata.businessName,
          businessEmail: tokendata.businessEmail,
          _id: tokendata.id,
          logoimg: tokendata.logoimg,
          signupStatus: "success",
          sellerLoaded: true,
        };
      } else return state;
    });
    builder.addCase(signinSeller.rejected, (state, action) => {
      //   alert(`${action.payload.message}`);
      return {
        ...state,
        signinStatus: "rejected",
        signinError: action.payload,
      };
    });
  },
});

export const { loadSeller,signoutSeller } = authSellerSlice.actions;
export default authSellerSlice.reducer;
