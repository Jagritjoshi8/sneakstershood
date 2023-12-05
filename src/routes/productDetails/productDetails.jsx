import "./productDetails.scss";
import { useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/productsApi";
import ProductDetailContainer from "../../components/productDetailContainer/productDetail.component";
import ReviewContainer from "../../components/reviewcontainer/review.component";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const selectedProduct = data?.find(({ _id }) => _id === productId);
  return (
    <div className="productDetail-page-container">
      <ProductDetailContainer selectedProduct={selectedProduct} />
      <ReviewContainer selectedProduct={selectedProduct} />
    </div>
  );
};

export default ProductDetails;
