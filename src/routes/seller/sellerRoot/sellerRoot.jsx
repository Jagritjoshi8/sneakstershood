import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./sellerRoot.styles.scss";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const SellerRoot = () => {
  const authseller = useSelector((state) => state.authseller);
  const navigate = useNavigate();
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
  return (
    <div className="seller-dashboard">
      <nav className="side-nav">
        <div className="logo-container">
          <Link to="seller-profile">
            <img src={imageURL} alt="Profile Preview" width="250" />
          </Link>
        </div>
        <NavLink to="summary" className="nl">
          Summary
        </NavLink>

        <NavLink to="products" className="nl">
          Products
        </NavLink>

        <NavLink to="orders" className="nl">
          Orders
        </NavLink>

        <NavLink to="users" className="nl">
          Users
        </NavLink>
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
