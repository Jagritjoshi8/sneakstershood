import React from "react";
import "./reviewForm.styles.scss";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { fontSize } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../../features/reviewSlice";

const ReviewFormContainer = ({ selectedProduct }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [hover, setHover] = React.useState(-1);
  const auth = useSelector((state) => state.auth);
  const review = useSelector((state) => state.review);
  //console.log("review State", review);
  let user;
  if (auth.name) {
    user = auth.name;
  } else {
    user = "Guest User";
  }
  const dispatch = useDispatch();
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addReview({
        productId: selectedProduct._id,
        reviewData: { rating, comment, user },
      })
    );
    setRating(null);
    setComment("");
  };

  return (
    <div>
      {!selectedProduct ? (
        <div>Product doesnt exist</div>
      ) : (
        <div className="review-form">
          <h1>Post Your Review About "{selectedProduct.name}"</h1>
          <form onSubmit={handleSubmit}>
            <div className="add-rating">
              <h2>Add Rating:</h2>
            </div>
            <div className="review-rating">
              {" "}
              <Rating
                name="hover-feedback"
                value={rating}
                precision={0.5}
                getLabelText={getLabelText}
                size="large"
                required
                sx={{ fontSize: 50 }}
                // defaultValue={2}
                onChange={(event, newValue) => {
                  console.log("nwvalue", newValue);
                  setRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.9 }} fontSize="inherit" />
                }
              />
              <div className="rating-label">
                {" "}
                {rating !== null && (
                  <div sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : rating]}
                  </div>
                )}
              </div>
            </div>
            <div className="review-comment">
              <label>Write Your Comment:</label>
              <textarea
                value={comment}
                rows="7"
                cols="52"
                placeholder="Write Your Valueable comment here..."
                required
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="review-warning">
              <div>
                {review.postingStatus === "rejected" ? (
                  <p>Warning: {review.postingError}</p>
                ) : null}
              </div>
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewFormContainer;
