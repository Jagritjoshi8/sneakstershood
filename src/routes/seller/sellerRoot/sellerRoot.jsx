import React from "react";
import "./sellerRoot.styles.scss";
import { Link, NavLink, Outlet } from "react-router-dom";

const SellerRoot = () => {
  return (
    <div className="seller-dashboard">
           <nav className="side-nav">
           <div className="logo-container">
            <img src="https://png.pngtree.com/png-clipart/20210912/original/pngtree-your-logo-poster-png-image_6728130.jpg" alt="Profile Preview" width="250" />
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
           
      </div>
  );
};

export default SellerRoot;
