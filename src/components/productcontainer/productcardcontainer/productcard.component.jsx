import "./productcard.styles.scss";
import Tilt from "react-parallax-tilt";
import { AiOutlineHeart } from "react-icons/ai";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { AiTwotoneHeart } from "react-icons/ai";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { setWishList } from "../../../features/wishlistSlice";
import Tooltip from "@mui/material/Tooltip";

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
      <div className="product-card" key={_id}>
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
              {verifyisInWishList(data) ? (
                <Tooltip title="click to remove from wishlist">
                  <FavoriteIcon sx={{ fontSize: 38 }} />
                </Tooltip>
              ) : (
                <Tooltip title="click to add in wishlist">
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 38 }} />
                </Tooltip>
              )}
            </button>
            <h3 className="remove-from-wishlist-txt">Remove From Wishlist</h3>
          </div>
        </div>
      </div>
    </Tilt>
  );
};
export default ProductCard;
