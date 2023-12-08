import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./sellerRoot.styles.scss";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SpeedIcon from "@mui/icons-material/Speed";
import MessageIcon from "@mui/icons-material/Message";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { signoutSeller } from "../../../features/authSellerSlice";

const SellerRoot = () => {
  const authseller = useSelector((state) => state.authseller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(authseller);
  let imageURL;
  if (authseller.logoimg) {
    imageURL = `http://localhost:8000/${authseller.logoimg}`;
  } else {
    imageURL = `https://png.pngtree.com/png-clipart/20210912/original/pngtree-your-logo-poster-png-image_6728130.jpg`;
  }
  useEffect(() => {
    if (!authseller._id) {
      navigate("/");
    }
  }, [authseller, navigate]);

  const signOutHandler = async () => {
    dispatch(signoutSeller());
    navigate("/");
  };
  return (
    <div className="seller-dashboard">
      <nav className="side-nav">
        <div className="logo-container">
          <Link to="seller-profile">
            <img src={imageURL} alt="Profile Preview" width="250" />
          </Link>
        </div>
        <NavLink to="summary" className="nl">
          <SpeedIcon sx={{ fontSize: 30 }} /> Summary<span>➤</span>
        </NavLink>

        <NavLink to="products" className="nl">
          <StorefrontIcon sx={{ fontSize: 30 }} /> Products
          <span>➤</span>
        </NavLink>

        <NavLink to="orders" className="nl">
          <ContentPasteIcon sx={{ fontSize: 30 }} /> Orders <span>➤</span>
        </NavLink>

        <NavLink to="channel" className="nl">
          <MessageIcon sx={{ fontSize: 30 }} /> Channel<span>➤</span>
        </NavLink>
        <NavLink to="seller-blog" className="nl">
          <NewspaperIcon sx={{ fontSize: 30 }} /> Blog<span>➤</span>
        </NavLink>
        <button
          onClick={() => navigate("/product")}
          className="seller-root-liveproductbtn"
        >
          Live Products
        </button>
        <button
          onClick={() => signOutHandler()}
          className="seller-root-signoutbtn"
        >
          Sign Out
        </button>
      </nav>
      <div className="seller-main-container">
        <div className="seller-header">
          <h1>Seller DashBoard</h1>
        </div>
        <div className="seller-main-container-content">
          <Outlet />
        </div>
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

export default SellerRoot;
