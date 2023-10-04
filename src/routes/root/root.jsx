import { useState, useEffect } from "react";
import "./root.scss";
import { Outlet } from "react-router";
import { ReactComponent as Shoelogo } from "../../assets/shoelogopic1.png";
import shoeimg from "./../../assets/shoelogopic1.png";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <img src={shoeimg} width="90px" height="80px" />
        </Link>
        <div className="navbarlinkcontainer">
          <Link to="product" className="navbarlinks">
            Products
          </Link>
          <Link className="navbarlinks">About</Link>
          <Link className="navbarlinks">Cart</Link>
          <Link to="sign-up" className="navbarlinks">
            SignUp
          </Link>
        </div>
      </div>
      <Outlet />
      <h3>this is footer</h3>
    </div>
  );
};

export default Root;
