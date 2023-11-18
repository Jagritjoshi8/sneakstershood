import "./productcard.styles.scss";
import Tilt from "react-parallax-tilt";
import { AiOutlineHeart } from "react-icons/ai";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { AiTwotoneHeart } from "react-icons/ai";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { setWishList } from "../../../features/wishlistSlice";

const ProductCard = ({ data }) => {
  const {
    _id,
    name,
    original_price,
    discounted_price,
    category_name,
    is_stock,
    rating,
    reviews,
    trending,
    img,
    isInWishList,
  } = data;
  //₹
  let bkimg;
  if (img.includes("uploads")) {
    bkimg = `http://localhost:8000/${img}`;
  } else {
    bkimg = img;
  }
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const wishlistHandler = (product) => {
    dispatch(setWishList(product));
  };

  const isProductInCart = (product) => {
    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (itemIndex >= 0) {
      return 1;
    } else {
      return 0;
    }
  };
  const verifyisInWishList = (product) => {
    const itemIndex = wishlist.wishlistItems.findIndex(
      (item) => item._id === product._id
    );

    if (itemIndex >= 0) {
      return 1;
    } else {
      return 0;
    }
  };
  return (
    <Tilt
      key={_id}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={false}
      transitionSpeed={2000}
      scale={1.02}
    >
      <div
        className="product-card"
        key={_id}
        // data-aos="fade-right"
        // // data-aos-easing="linear"
        // data-aos-duration="2500"
      >
        <Link to={`/product-details/${_id}`}>
          <div className="product-card-image">
            <Tilt
              transitionSpeed={2000}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.18}
            >
              <img src={bkimg} />
            </Tilt>
          </div>
        </Link>

        <div className="product-card-details">
          <h3>{name}</h3>
          <p className="ratings">
            {rating}
            <BsFillStarFill color="orange" /> ({reviews} reviews){" "}
          </p>
          <div className="price-container">
            <p className="original-price">${original_price}</p>
            <p className="discount-price">${discounted_price}</p>
          </div>

          <p className="gender-txt">Gender: {category_name}</p>
          <div className="info">
            {!is_stock && <p className="out-of-stock">Out of stock</p>}

            {trending && <p className="trending">Trending</p>}
            <p className="empty-info"></p>
          </div>
        </div>

        <div className="product-card-buttons">
          {isProductInCart(data) ? (
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              Go To Cart
            </button>
          ) : (
            <button className="cart-btn" onClick={() => handleAddToCart(data)}>
              Add To Cart
            </button>
          )}

          <div
            className="wishlist-btns-container"
            onClick={() => wishlistHandler(data)}
          >
            <button className="wishlist-btn">
              {/* <AiOutlineHeart size={38} /> */}
              {verifyisInWishList(data) ? (
                <AiTwotoneHeart size={39} />
              ) : (
                // <FavoriteTwoToneIcon
                //   sx={{ fontSize: 38 }}
                //   color="disabled.dark"
                // />
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 38 }} />
                // <AiOutlineHeart size={38} />
              )}
            </button>
            <h3 className="remove-from-wishlist-txt">Remove From Wishlist</h3>
          </div>
          {/* <button
            disabled={cartLoading}
            onClick={() => addToCartHandler(product)}
            className="cart-btn"
          >
            {!isProductInCart(product) ? "Add To Cart" : "Go to Cart"}
          </button>
          <button
            onClick={() => wishlistHandler(product)}
            className="wishlist-btn"
          >
            {!isProductInWishlist(product) ? (
              <AiOutlineHeart size={30} />
            ) : (
              <AiTwotoneHeart size={30} />
            )}
          </button> */}
        </div>
      </div>
    </Tilt>
    // <div key={id}>
    //   <h2>{name}</h2>
    //   <p>{id}</p>
    //   <p>{original_price}</p>
    // </div>
  );
};
export default ProductCard;
