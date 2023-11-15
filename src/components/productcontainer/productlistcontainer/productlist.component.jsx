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
        <div className="no-matching-product" data-aos="fade-right"
        // data-aos-easing="linear"
        data-aos-duration="2500"
  >
        <h1>Oops..!! No Matching Product</h1>
        
        <img src="https://www.adda247.com/images/no-result-found.png"/>
      </div>
        
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
