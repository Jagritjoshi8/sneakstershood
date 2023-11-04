import "./productlist.styles.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductsContext } from "../../../contexts/products.context";
import ProductCard from "../productcardcontainer/productcard.component";
import { useGetAllProductsQuery } from "../../../features/productsApi";
import { getPricedProducts } from "../../../helpers/filter-functions/price";
import { getRatedProducts } from "../../../helpers/filter-functions/ratings";
import { getCategoryWiseProducts } from "../../../helpers/filter-functions/category";
import { getSortedProducts } from "../../../helpers/filter-functions/sort";
const ProductListContainer = () => {
  // const { products } = useContext(ProductsContext);
  const { price, rating, categories, sort } = useSelector(
    (state) => state.productfilters
  );
  const { data, error, isLoading } = useGetAllProductsQuery();

  const ratedProducts = getRatedProducts(data, rating);

  const categoryProducts = getCategoryWiseProducts(ratedProducts, categories);

  const pricedProducts = getPricedProducts(categoryProducts, price);

  const sortedProducts = getSortedProducts(pricedProducts, sort);

  return (
    <div className="product-card-container">
      {!sortedProducts ? (
        <p>no matching products</p>
      ) : (
        <>
          {sortedProducts.map((data) => {
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
