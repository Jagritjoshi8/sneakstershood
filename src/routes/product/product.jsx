import { useState, useEffect } from "react";
import "./product.scss";
import { Outlet } from "react-router";

const Product = () => {
  return (
    <div>
      <h2>this is product section</h2>
      <Outlet />
      <h3>this is fixed filter component</h3>
    </div>
  );
};

export default Product;
