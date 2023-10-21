import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  wishlistItems: [],
  wishlistQuantity: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishList(state, action) {
      const itemIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        const nextWishListItems = state.wishlistItems.filter(
          (wishlistItem) => wishlistItem.id !== action.payload.id
        );
        state.wishlistItems = nextWishListItems;
        toast(`🔶 "${action.payload.name}" is removed from wishlist🙁`);
      } else {
        state.wishlistItems.push(action.payload);
        toast.success(
          `"${action.payload.name}" is added to wishlist successfully 🎉`
        );
      }
    },
    getTotalWishList(state, action) {},
  },
});
export const { setWishList, removeFromWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
