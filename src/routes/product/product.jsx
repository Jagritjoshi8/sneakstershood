import { useState, useEffect, useContext } from "react";
import "./product.scss";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductListContainer from "../../components/productcontainer/productlistcontainer/productlist.component";
import FilterContainer from "../../components/filtercontainer/filtercontainer.component";

const Product = () => {
  const auth = useSelector((state) => state.auth);
  const userLoaded = auth.userLoaded;
  return (
    <div className="page-container">
      <FilterContainer />
      <ProductListContainer className="products-container" />
    </div>
    // <div>
    //   {!userLoaded ? (
    //     <div className="cart-empty">
    //       <p> Please Sign In First </p>
    //       <div className="start-shopping">
    //         <button>
    //           <Link to="/sign-in"> Sign IN</Link>
    //         </button>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="page-container">
    //       <FilterContainer />
    //       <ProductListContainer className="products-container" />
    //     </div>
    //   )}
    // </div>
  );
};

export default Product;
