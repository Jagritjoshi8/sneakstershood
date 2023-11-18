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
import AOSInitializer from "./components/extra/aosInitalizer/aosInitializer";
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
import SignUpSeller from "./routes/sign/seller/signUpSeller";
import authSellerReducer, { loadSeller } from "./features/authSellerSlice";
import SellerRoot from "./routes/seller/sellerRoot/sellerRoot";
import SignInSeller from "./routes/sign/seller/signInSeller";
import SellerProduct from "./routes/seller/sellerProduct/sellerProduct";
import SellerProfileConatiner from "./routes/seller/sellerProfile/sellerProfile";
import SellerProfile from "./routes/seller/sellerProfile/sellerProfile";
import SellerSummary from "./routes/seller/sellerSummary/sellerSummary";

const store = configureStore({
  reducer: {
    auth: authReducer,
    authseller: authSellerReducer,
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
store.dispatch(loadSeller(null));

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
        path: "sign-up-seller",
        element: <SignUpSeller />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-in-seller",
        element: <SignInSeller />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "seller",
    element: <SellerRoot />,
    children: [
      {
        path: "seller-profile",
        element: <SellerProfile />,
      },
      {
        path: "summary",
        element: <SellerSummary />,
      },
      {
        path: "products",
        element: <SellerProduct />,
      },
      {
        path: "orders",
        element: <div>Orders</div>,
      },
      {
        path: "users",
        element: <div>users</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <AOSInitializer>
          <RouterProvider router={router} />
        </AOSInitializer>
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
