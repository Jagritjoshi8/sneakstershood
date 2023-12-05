import "./productlist.styles.scss";
import { useSelector } from "react-redux";
import ProductCard from "../productcardcontainer/productcard.component";
import { useGetAllProductsQuery } from "../../../features/productsApi";
import { getPricedProducts } from "../../../helpers/filter-functions/price";
import { getRatedProducts } from "../../../helpers/filter-functions/ratings";
import { getCategoryWiseProducts } from "../../../helpers/filter-functions/category";
import { getSortedProducts } from "../../../helpers/filter-functions/sort";
import { getSearchedProducts } from "../../../helpers/filter-functions/productSearch";
const ProductListContainer = () => {
  const { inputSearch, price, rating, categories, sort } = useSelector(
    (state) => state.productfilters
  );
  const { data, error, isLoading } = useGetAllProductsQuery();
  const searchedProducts = getSearchedProducts(data, inputSearch);
  const ratedProducts = getRatedProducts(searchedProducts, rating);

  const categoryProducts = getCategoryWiseProducts(ratedProducts, categories);

  const pricedProducts = getPricedProducts(categoryProducts, price);

  const sortedProducts = getSortedProducts(pricedProducts, sort);
  console.log("sorted products", sortedProducts);

  return (
    <div
      className="product-card-container"
      data-aos="fade-right"
      data-aos-duration="2500"
    >
      {sortedProducts?.length < 1 ? (
        <div
          className="no-matching-product"
          data-aos="fade-right"
          data-aos-duration="2500"
        >
          <h1>Oops..!! No Matching Product</h1>

          <img src="https://www.adda247.com/images/no-result-found.png" />
        </div>
      ) : (
        <>
          {sortedProducts?.map((data) => {
            return <ProductCard data={data} key={data._id} />;
          })}
        </>
      )}
    </div>
  );
};

export default ProductListContainer;
