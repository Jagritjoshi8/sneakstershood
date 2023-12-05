import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
  wishlistQuantity: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishList(state, action) {
      const itemIndex = state.wishlistItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        const nextWishListItems = state.wishlistItems.filter(
          (wishlistItem) => wishlistItem._id !== action.payload._id
        );
        state.wishlistItems = nextWishListItems;
        toast(`🔶 "${action.payload.name}" is removed from wishlist🙁`);
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishlistItems)
        );
      } else {
        state.wishlistItems.push(action.payload);
        toast.success(
          `"${action.payload.name}" is added to wishlist successfully 🎉`
        );
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishlistItems)
        );
      }
    },
    clearWishList(state, action) {
      state.wishlistItems = [];
      toast.error(` Wishlist is Cleared ‼️ 🤯 `);
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
  },
});
export const { setWishList, clearWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
