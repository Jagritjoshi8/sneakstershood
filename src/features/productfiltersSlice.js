import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  price: [],
  rating: "2.5",
  categories: [],
  sort: "",
};

const productfiltersSlice = createSlice({
  name: "productfilters",
  initialState,
  reducers: {
    addPrice(state, action) {
      const isPricePresent = state.price.find(
        (price) => price.min === action.payload.min
      );
      if (isPricePresent) {
        const newPrice = state.price.filter(
          (price) => price.min !== action.payload.min
        );
        state.price = newPrice;
      } else {
        state.price.push(action.payload);
      }
    },
    addRatings(state, action) {
      const newRating = action.payload;
      state.rating = newRating;
    },
    addCategories(state, action) {
      const isCategoryPresent = state.categories.find(
        (category) => category === action.payload
      );
      if (isCategoryPresent) {
        const newCategories = state.categories.filter(
          (category) => category !== action.payload
        );
        state.categories = newCategories;
      } else {
        state.categories.push(action.payload);
      }
    },
    addSort(state, action) {
      const newSorting = action.payload;
      state.sort = newSorting;
    },
    resetFilters(state, action) {
      state.price = [];
      state.rating = "2.5";
      state.categories = [];
      state.sort = "";
    },
  },
});
export const { addPrice, addRatings, addCategories, addSort, resetFilters } =
  productfiltersSlice.actions;
export default productfiltersSlice.reducer;
