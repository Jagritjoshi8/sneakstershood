import GetReviewContainer from "./getReviewContainer/getReview.component";
import "./review.styles.scss";
import ReviewFormContainer from "./reviewForm/reviewForm.component";

const ReviewContainer = ({ selectedProduct }) => {
  return (
    <div>
      {!selectedProduct ? (
        <div>Product doesnt exist</div>
      ) : (
        <div className="product-detail-reviewSection">
          <h2># Review Section</h2>
          <div className="productDetail-second-page">
            {" "}
            <GetReviewContainer selectedProduct={selectedProduct} />
            <ReviewFormContainer selectedProduct={selectedProduct} />
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default ReviewContainer;
