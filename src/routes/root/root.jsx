import { useState, useEffect, useContext } from "react";
import "./root.scss";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MessageIcon from "@mui/icons-material/Message";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import shoeimg from "./../../assets/shoelogopic1.png";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { UserContext } from "../../contexts/user.context";
import ScrollToTop from "../../components/extra/scrolltotop/scrolltotop.component";
import { getTotals } from "../../features/cartSlice";

const Root = () => {
  // const { currentUser } = useContext(UserContext);
  const auth = useSelector((state) => state.auth);

  const userLoaded = auth.userLoaded;
  //console.log(currentUser);
  const cart = useSelector((state) => state.cart);
  const { cartTotalQuantity } = cart;
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, wishlist, dispatch]);

  return (
    <div>
      <ScrollToTop />
      <div className="navbar">
        <NavLink to="/">
          <div className="sneakershood-logo-name">
            {" "}
            <img
              src="/assets/images/products-images/image-kids-1.png"
              width="90px"
              height="85px"
            />
            <p className="sneakershood-name"> Sneakers Hood </p>
          </div>
        </NavLink>
        <div className="navbarlinkcontainer">
          <NavLink to="product" className="navbarlinks">
            Products
          </NavLink>
          <NavLink className="navbarlinks" to="wishlist">
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
          </NavLink>
          <NavLink className="navbarlinks" to="cart">
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
          </NavLink>
          <NavLink className="navbarlinks" to="channel">
            Channel <MarkUnreadChatAltOutlinedIcon sx={{ fontSize: 25 }} />
            {/* {cartTotalQuantity} */}
          </NavLink>
          {userLoaded ? (
            <NavLink to="/profile" className="navbarlinks">
              {auth.profileimg ? (
                <div className="profileimg-view">
                  <img
                    src={`http://localhost:8000/${auth.profileimg}`}
                    alt="img"
                  />
                </div>
              ) : (
                <div className="profileimg-view">
                  <img
                    src={`https://robohash.org/${auth.name}4?set=set5&size=60x60`}
                    alt="img"
                  />
                </div>
              )}
            </NavLink>
          ) : (
            <div>
              {location.pathname === "/sign-up" ||
              location.pathname === "/sign-up-seller" ? (
                <NavLink to="/sign-up" className="navbarlinks">
                  Sign Up
                </NavLink>
              ) : (
                <NavLink to="/sign-in" className="navbarlinks">
                  Sign In
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>

      <Outlet />
      {/* <div className="footercontainer">
        <h3>this is footer</h3>
      </div> */}

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
