import "./productDetail.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { BsFillStarFill } from "react-icons/bs";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { AiTwotoneHeart } from "react-icons/ai";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { addToCart } from "../../features/cartSlice";
import { setWishList } from "../../features/wishlistSlice";
const ProductDetailContainer = ({ selectedProduct }) => {
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

  let bkimg;
  if (selectedProduct) {
    if (selectedProduct.img?.includes("uploads")) {
      bkimg = `http://localhost:8000/${selectedProduct.img}`;
    } else {
      bkimg = selectedProduct.img;
    }
  }
  return (
    <div
      className="productDetail-container"
      data-aos="zoom-in-up"
      data-aos-duration="2500"
    >
      {!selectedProduct ? (
        <div>Product doesnt exist</div>
      ) : (
        <div className="full-productDetail-page">
          <div className="productDetail-inner-container">
            <div className="productDetail-card-image">
              <Tilt
                transitionSpeed={2000}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.18}
              >
                <img src={bkimg} />
              </Tilt>
            </div>
            <div className="product-description-container">
              <h1>{selectedProduct.name}</h1>
              <p className="detail-ratings">
                <b>{selectedProduct.rating}</b>
                <BsFillStarFill color="orange" /> ({selectedProduct.reviews}{" "}
                reviews){" "}
              </p>
              <div className="pricedetail-container">
                <p className="original-price">
                  ${selectedProduct.original_price}
                </p>
                <p className="discount-price">
                  ${selectedProduct.discounted_price}
                </p>
              </div>
              <div className="detail-info">
                {!selectedProduct.is_stock ? (
                  <p className="out-of-stock">Out of Stock</p>
                ) : (
                  <p className="in-stock">In Stock</p>
                )}

                {selectedProduct.trending && (
                  <p className="trending">Trending</p>
                )}
              </div>
              <p className="detail-gender-txt">
                <b>Size:</b> {selectedProduct.size}
              </p>
              <p className="detail-brand">
                <b>Brand:</b>{" "}
                {selectedProduct.brand ? selectedProduct.brand : "Nike"}
              </p>
              <p className="detail-seller">
                <b>Seller Name:</b>{" "}
                {selectedProduct.sellerName
                  ? selectedProduct.sellerName
                  : "Alpha Sneakers"}
              </p>
              <p className="detail-gender-txt">
                <b>Category:</b> {selectedProduct.category_name}'s wear
              </p>
              <p className="detail-quality-txt">
                <b>Quality Type:</b>{" "}
                {selectedProduct.qualityType
                  ? selectedProduct.qualityType
                  : "Performance Quality"}
              </p>
              <p className="detail-color">
                <b>Color:</b>{" "}
                {selectedProduct.color ? selectedProduct.color : "Vibrant"}
              </p>
              <p className="detail-description">
                {" "}
                <b>Desciption:-</b>{" "}
                <span className="inner-detail-description">
                  {selectedProduct.description}
                </span>
              </p>
              <div className="details-cart-buttons">
                <div>
                  {isProductInCart(selectedProduct) ? (
                    <button
                      className="cart-btn"
                      onClick={() => navigate("/cart")}
                    >
                      <span> Go To Cart </span>
                      {"  "}
                      <ShoppingCartOutlinedIcon sx={{ fontSize: 29 }} />
                    </button>
                  ) : (
                    <button
                      className="cart-btn"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
                      <span> Add To Cart </span>
                      {"  "}
                      <ShoppingCartOutlinedIcon sx={{ fontSize: 29 }} />
                    </button>
                  )}
                </div>

                <div
                  className="details-wishlist-btns"
                  onClick={() => wishlistHandler(selectedProduct)}
                >
                  <button className="wishlist-btn">
                    {verifyisInWishList(selectedProduct) ? (
                      <span className="w-inner">
                        <AiTwotoneHeart size={39} />{" "}
                        <div>Remove From Wishlist</div>
                      </span>
                    ) : (
                      <span className="w-inner">
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 38 }} /> Add
                        To Wishlist
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailContainer;
