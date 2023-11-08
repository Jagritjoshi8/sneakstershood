import "./productDetails.scss";
import { useParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { useGetAllProductsQuery } from "../../features/productsApi";
import ProductDetailContainer from "../../components/productDetailContainer/productDetail.component";
import ReviewContainer from "../../components/reviewcontainer/review.component";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const selectedProduct = data?.find(
    ({ id }) => Number(id) === Number(productId)
  );

  //console.log(selectedProduct);

  return (
    <div className="productDetail-page-container">
      {/* <div className="header">
        <h1>Product Details {productId}</h1>
      </div> */}
      <ProductDetailContainer selectedProduct={selectedProduct} />
      <ReviewContainer selectedProduct={selectedProduct} />
    </div>
  );
};

export default ProductDetails;
