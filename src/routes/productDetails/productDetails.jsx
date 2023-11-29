import "./productDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { useGetAllProductsQuery } from "../../features/productsApi";
import ProductDetailContainer from "../../components/productDetailContainer/productDetail.component";
import ReviewContainer from "../../components/reviewcontainer/review.component";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const selectedProduct = data?.find(({ _id }) => _id === productId);

  //   console.log(productId);
  console.log(selectedProduct);

  return (
    <div className="productDetail-page-container">
      <ProductDetailContainer selectedProduct={selectedProduct} />
      <ReviewContainer selectedProduct={selectedProduct} />
    </div>
  );
};

export default ProductDetails;
