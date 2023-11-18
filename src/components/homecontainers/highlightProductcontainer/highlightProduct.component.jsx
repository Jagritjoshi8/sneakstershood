import React from "react";
import "./highlightProduct.styles.scss";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { BsFillStarFill } from "react-icons/bs";
import Tilt from "react-parallax-tilt";

const HighlightProductContainer = ({ product }) => {
  return (
    <div className="highlight-background">
      {" "}
      <div className="blur-background">HigLight</div>
      <div
        className="HighlightProductContainer"
        data-aos="zoom-in-up"
        data-aos-duration="2500"
      >
        <h1>Highlight Product</h1>
        {!product ? (
          <div>no product</div>
        ) : (
          <div className="c1">
            <div className="product-name">
              <Link to={`/product-details/${product._id}`}>
                {" "}
                <h2>{product.name}</h2>
              </Link>
            </div>
            <button className="explore-more-button">
              <Link to={`/product-details/${product._id}`}> Explore More</Link>
            </button>
            <div className="highlight-card-images">
              <Tilt
                transitionSpeed={2000}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.18}
              >
                <Link to={`/product-details/${product._id}`}>
                  <img src={product.img} />
                </Link>
              </Tilt>
            </div>

            {/* <Link to={`/product-details/${product.id}`}>
              <img src={product.img} />
            </Link> */}

            {/* <div className="description">{product.description}</div> */}
            <div className="highlight-details">
              <div className="p2">
                <span className="s1"> Price:</span>

                <span className="original-price">
                  ${product.original_price}
                </span>

                <span className="discount-price">
                  ${product.discounted_price}
                </span>
              </div>
              <div className="p2">
                <span className="s1"> Rating:</span>
                <span className="s2">{product.rating}</span>
                <BsFillStarFill color="orange" />
                {/* <Rating
                name="read-only"
                precision={0.5}
                size="large"
                value={product.rating}
                readOnly
              /> */}
              </div>
              <div className="p2">
                <span className="s1"> Category:</span>
                <p>{product.category_name}'s wear</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="blur-background"></div>
    </div>
  );
};

export default HighlightProductContainer;
