import "./productDetails.scss";
import { useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/productsApi";
import ProductDetailContainer from "../../components/productDetailContainer/productDetail.component";
import ReviewContainer from "../../components/reviewcontainer/review.component";
import PopularSneakersContainer from "../../components/homecontainers/popularsneakers/popularsneaker.component";
import KidsContainer from "../../components/homecontainers/kidscontainer/kidscontainer.component";
import SneakerNewsContainer from "../../components/homecontainers/sneakernews/sneakernews";
import MensContainer from "../../components/homecontainers/menscontainer/menscontainer.component";
import WomenContainer from "../../components/homecontainers/womencontainer/womencontainer";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const selectedProduct = data?.find(({ _id }) => _id === productId);
  return (
    <div className="productDetail-page-container">
      <ProductDetailContainer selectedProduct={selectedProduct} />
      {selectedProduct?.category_name === "kid" ? (
        <KidsContainer />
      ) : selectedProduct?.category_name === "men" ? (
        <MensContainer />
      ) : selectedProduct?.category_name === "women" ? (
        <WomenContainer />
      ) : null}

      <PopularSneakersContainer />
      <SneakerNewsContainer />
      <ReviewContainer selectedProduct={selectedProduct} />
    </div>
  );
};

export default ProductDetails;
