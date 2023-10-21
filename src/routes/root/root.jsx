import { useState, useEffect, useContext } from "react";
import "./root.scss";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import shoeimg from "./../../assets/shoelogopic1.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { UserContext } from "../../contexts/user.context";
import ScrollToTop from "../../components/extra/scrolltotop/scrolltotop.component";
import { getTotals } from "../../features/cartSlice";

const Root = () => {
  const { currentUser } = useContext(UserContext);
  //console.log(currentUser);
  const cart = useSelector((state) => state.cart);
  const { cartTotalQuantity } = cart;
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, wishlist, dispatch]);

  return (
    <div>
      <ScrollToTop />
      <div className="navbar">
        <Link to="/">
          <img src={shoeimg} width="90px" height="80px" />
        </Link>
        <div className="navbarlinkcontainer">
          <Link to="product" className="navbarlinks">
            Products
          </Link>
          <Link className="navbarlinks" to="wishlist">
            WishList{" "}
            <Badge
              badgeContent={wishlistItems.length}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": { fontSize: 15, height: 20, minWidth: 22 },
              }}
            >
              <FavoriteBorderOutlinedIcon sx={{ fontSize: 29 }} />
            </Badge>
          </Link>
          <Link className="navbarlinks" to="cart">
            Cart{" "}
            <Badge
              badgeContent={cartTotalQuantity}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": { fontSize: 15, height: 20, minWidth: 22 },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 29 }} />
            </Badge>
            {/* {cartTotalQuantity} */}
          </Link>
          {currentUser ? (
            <Link to="/profile" className="navbarlinks">
              Hi 👋 <b>{currentUser.name}</b>
            </Link>
          ) : (
            <Link to="sign-up" className="navbarlinks">
              SignUp
            </Link>
          )}
        </div>
      </div>
      <Outlet />
      <div className="footercontainer">
        <h3>this is footer</h3>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1400,
          style: {
            width: "500px",
            background: "lightyellow",
            border: "2px solid grey",
            fontSize: "19px",
            fontWeight: "600",
          },
          success: {
            duration: 1400,
            style: {
              background: "lightgreen",
              fontSize: "19px",
              fontWeight: "600",
            },
          },
          error: {
            duration: 1400,
            style: {
              background: "lightcoral",
              fontSize: "19px",
              fontWeight: "600",
            },
          },
        }}
        containerStyle={{
          top: "6rem",
        }}
      />
    </div>
  );
};

export default Root;
