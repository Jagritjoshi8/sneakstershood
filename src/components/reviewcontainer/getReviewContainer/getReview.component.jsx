import React from "react";
import "./getReview.styles.scss";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductReviews } from "../../../features/reviewSlice";

const GetReviewContainer = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.review.allReviews);
  const latestReviews = allReviews?.slice().reverse();
  useEffect(() => {
    dispatch(getProductReviews(selectedProduct._id));
  }, []);
  return (
    <div>
      {!selectedProduct ? (
        <div>Product doesnt exist</div>
      ) : (
        <div className="get-review">
          <div className="header">
            <h1>Latest Reviews About "{selectedProduct.name}"</h1>
          </div>

          {allReviews.length < 1 ? (
            <div className="not-reviewed">
              <img
                src="https://img.graphicsurf.com/2020/10/customer-reviews-vector-free-illustration.jpg"
                height="600px"
              />
              <h1>Not Reviewed Yet</h1>
            </div>
          ) : (
            <div>
              <div className="total-reviews">
                Total Reviews: {allReviews.length}
              </div>
              {latestReviews.map((review) => {
                return (
                  <div key={review._id} className="single-review">
                    <p className="p1">
                      Reviewed By☞ <span>{review.commentBy}</span>
                    </p>
                    <p className="p2">
                      <span className="s1"> Rating Given:</span>

                      <Rating
                        name="read-only"
                        precision={0.5}
                        size="large"
                        value={review.rating}
                        readOnly
                      />
                      <span className="s2">({review.rating})</span>
                    </p>
                    <p className="p3">
                      Review:<span>{review.content}</span>{" "}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default GetReviewContainer;
