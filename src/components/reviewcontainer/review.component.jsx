import GetReviewContainer from "./getReviewContainer/getReview.component";
import "./review.styles.scss";
import ReviewFormContainer from "./reviewForm/reviewForm.component";

const ReviewContainer = ({ selectedProduct }) => {
  return (
    <div>
      {!selectedProduct ? (
        <div>Product doesnt exist</div>
      ) : (
        <div
          className="productDetail-second-page"
          data-aos="zoom-in-up"
          data-aos-duration="2500"
        >
          {" "}
          <GetReviewContainer selectedProduct={selectedProduct} />
          <ReviewFormContainer selectedProduct={selectedProduct} />
        </div>
      )}
      ;
    </div>
  );
};

export default ReviewContainer;
