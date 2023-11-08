import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/home";
import Root from "./routes/root/root";
import Product from "./routes/product/product";
import SignUp from "./routes/sign/signUp";
import SignIn from "./routes/sign/signIn";
import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";
import Profile from "./routes/profile/profile";
import Cart from "./routes/cart/cart";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, { productsFetch } from "./features/productSlice";
import { productsApi } from "./features/productsApi";
import cartReducer, { getTotals } from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";
import Wishlist from "./routes/wishlist/wishlist";
import authReducer, { loadUser } from "./features/authSlice";
import orderReducer from "./features/orderSlice";
import productfiltersReducer from "./features/productfiltersSlice";
import ProductDetails from "./routes/productDetails/productDetails";
import reviewReducer from "./features/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    productfilters: productfiltersReducer,
    review: reviewReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});
store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product-details/:productId",
        element: <ProductDetails />,
      },

      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
{
  /* <React.StrictMode>
  <ProductsProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </ProductsProvider>
</React.StrictMode>; */
}
reportWebVitals();
