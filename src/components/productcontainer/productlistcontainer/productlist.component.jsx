import "./productlist.styles.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../../contexts/products.context";
import ProductCard from "../productcardcontainer/productcard.component";
import { useGetAllProductsQuery } from "../../../features/productsApi";
const ProductListContainer = () => {
  // const { products } = useContext(ProductsContext);
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <div className="product-card-container">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>erorr..</p>
      ) : (
        <>
          {data.map((data) => {
            return <ProductCard data={data} key={data.id} />;
          })}
        </>
      )}
      {/* {products.map((data) => {
        return <ProductCard data={data} key={data.id} />;
      })} */}
    </div>
  );
};

export default ProductListContainer;
