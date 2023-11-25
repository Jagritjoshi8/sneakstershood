import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./popularsneaker.styles.scss";
import { AiTwotoneHeart } from "react-icons/ai";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useGetAllProductsQuery } from "../../../features/productsApi";
import { getRatedProducts } from "../../../helpers/filter-functions/ratings";
import { addToCart } from "../../../features/cartSlice";
import { setWishList } from "../../../features/wishlistSlice";
import { Link } from "react-router-dom";

const PopularSneakersContainer = () => {
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
  const { data, error, isLoading } = useGetAllProductsQuery();

  const ratedProducts = getRatedProducts(data, 5);
  const top3RatedProducts = ratedProducts?.slice(0, 3);
  console.log("top3", ratedProducts);
  return (
    <div
      className="PopularSneakersContainer"
      data-aos="fade-left"
      data-aos-duration="2500"
    >
      <h1>#Hot Picks</h1>
      <div>
        {!ratedProducts ? (
          <div>No Products</div>
        ) : (
          <div className="top-three-container">
            {top3RatedProducts.map((data) => {
              console.log("top-3", data);
              return (
                <div key={data._id} className="single-pick">
                  <div className="inner-details">
                    <h2>{data.name}</h2>
                    <h3>{data.category_name}'s Sports Shoes</h3>
                    <h3>${data.discounted_price}</h3>
                    <h4>★ {data.rating}</h4>
                    <div className="btns-container">
                      <div
                        className="single-pick-wishlist"
                        onClick={() => wishlistHandler(data)}
                      >
                        {/* <AiOutlineHeart size={38} /> */}
                        {verifyisInWishList(data) ? (
                          <FavoriteIcon sx={{ fontSize: 28 }} />
                        ) : (
                          <FavoriteBorderOutlinedIcon sx={{ fontSize: 28 }} />
                        )}
                      </div>
                      <div className="single-pick-addtocart">
                        {isProductInCart(data) ? (
                          <button
                            className="cart-btnsf"
                            onClick={() => navigate("/cart")}
                          >
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 19 }} />
                            {"  "}
                            Go To Cart{" "}
                          </button>
                        ) : (
                          <button
                            className="cart-btns"
                            onClick={() => handleAddToCart(data)}
                          >
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 19 }} />
                            {"   "}
                            Add To Cart{" "}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="z-rotates-img">
                    <Link to={`/product-details/${data._id}`}>
                      <img src={data.img} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularSneakersContainer;
