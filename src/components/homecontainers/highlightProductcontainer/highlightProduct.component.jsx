import React from "react";
import "./highlightProduct.styles.scss";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const HighlightProductContainer = ({ product }) => {
  return (
    <div className="HighlightProductContainer">
      <h1>Highlight Product</h1>
      {!product ? (
        <div>no product</div>
      ) : (
        <div className="c1">
          <div className="highlight-card-images">
            <Tilt
              transitionSpeed={2000}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.18}
            >
              <Link to={`/product-details/${product.id}`}>
                <img src={product.img} />
              </Link>
            </Tilt>
          </div>

          {/* <Link to={`/product-details/${product.id}`}>
              <img src={product.img} />
            </Link> */}

          <div className="description">{product.description}</div>
        </div>
      )}
    </div>
  );
};

export default HighlightProductContainer;
