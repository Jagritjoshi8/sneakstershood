import React from "react";
import "./sellerRoot.styles.scss";
import { Link } from "react-router-dom";

const SellerRoot = () => {
  return (
    <div className="seller-dashboard">
      <h1>Seller DashBoard</h1>
      <div className="side-nav">
        <Link
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        >
          Summary
        </Link>
        <Link
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        >
          Products
        </Link>
        <Link
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          Orders
        </Link>
        <Link
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          Users
        </Link>
      </div>
    </div>
  );
};

export default SellerRoot;
