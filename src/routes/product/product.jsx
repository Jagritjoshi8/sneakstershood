import { useState, useEffect, useContext } from "react";
import "./product.scss";
import { Outlet } from "react-router";
import ProductListContainer from "../../components/productcontainer/productlistcontainer/productlist.component";
import FilterContainer from "../../components/filtercontainer/filtercontainer.component";

const Product = () => {
  return (
    <div className="page-container">
      <FilterContainer />
      <ProductListContainer className="products-container" />
      {/* {products.map((data) => {
        return (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <p>{data.original_price}</p>
          </div>
        );
      })} */}

      {/* <h2>this is product section</h2>
      <Outlet />
      <h3>this is fixed filter component</h3> */}
    </div>
  );
};

export default Product;
