import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  couponSelected: [],
  totalCouponDiscount: 0,
  cartTotalQuantity: 0,
  cartOgTotalAmount: 0,
  cartTotalAmount: 0,
  cartFTotalAmount: 0,
  openModal: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (!action.payload.is_stock) {
        toast.error(
          `Sorry,"${action.payload.name}" is currently not in stock 😔`
        );
      } else if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Added one more  "${action.payload.name}" to cart 🤩`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(
          `"${action.payload.name}" is added to cart successfully 🎉`
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      toast(`🔶 "${action.payload.name}" is removed from cart 🙁`);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast(`🔶 Removed one "${action.payload.name}" from cart 😯`);
      } else {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nextCartItems;

        toast(`🔶 "${action.payload.name}" is removed from cart 🙁`);

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error(` Cart is Cleared ‼️ 🤯 `);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setCouponSelected(state, action) {
      const couponIndex = state.couponSelected.findIndex(
        (item) => item.id === action.payload.id
      );
      if (couponIndex >= 0) {
        const nextCouponSelected = state.couponSelected.filter(
          (coupon) => coupon.id !== action.payload.id
        );
        state.couponSelected = nextCouponSelected;
      } else {
        state.couponSelected.push(action.payload);
      }
    },

    getTotals(state, action) {
      let totalCouponDiscount = state.couponSelected?.reduce(
        (acc, curr) =>
          curr.amount
            ? acc + curr.amount
            : acc + (curr.discount * state.cartTotalAmount) / 100,
        0
      );

      let { ogtotal, total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { original_price, discounted_price, cartQuantity } = cartItem;
          const ogTotal = original_price * cartQuantity;
          const itemTotal = discounted_price * cartQuantity;

          cartTotal.ogtotal += ogTotal;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
          console.log(cartTotal);
        },
        {
          ogtotal: 0,
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      state.cartOgTotalAmount = ogtotal;
      state.totalCouponDiscount = totalCouponDiscount;
      state.cartFTotalAmount =
        state.cartTotalAmount - state.totalCouponDiscount + 50;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  setCouponSelected,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
