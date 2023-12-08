import "./wishlist.styles.scss";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ProductCard from "../productcontainer/productcardcontainer/productcard.component";
import Tooltip from "@mui/material/Tooltip";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Autoplay,
  Keyboard,
} from "swiper/modules";

import "swiper/css/bundle";
import { clearWishList } from "../../features/wishlistSlice";

const WishListContainer = ({ wishlist }) => {
  const dispatch = useDispatch();
  const handleClearWishlist = () => {
    dispatch(clearWishList());
  };
  return (
    <div className="wishlist-page">
      <div className="wishlist-page-header">
        <div className="whishlist-header-inner-container">
          <h1>WishList</h1> <FavoriteBorderOutlinedIcon sx={{ fontSize: 38 }} />{" "}
        </div>
        <div className="marquee-container">
          <p className="marquee-text">
            <img src="https://img.freepik.com/premium-vector/single-one-line-drawing-liver-anatomy-human-organ-vector-illustration-medical-concept_505956-707.jpg?w=900" />{" "}
            <img src="https://thumbs.dreamstime.com/b/adidas-jordan-nike-under-armour-converse-puma-popular-sportwear-brands-logos-sports-equipment-sportswear-company-logo-icon-222305820.jpg" />{" "}
          </p>
        </div>
      </div>
      <div className="wishlist-container">
        <Swiper
          className="wishlist-containers"
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Mousewheel,
            Autoplay,
            Keyboard,
          ]}
          spaceBetween={30}
          slidesPerView={"auto"}
          navigation
          freeMode={true}
          pagination={{ dynamicBullets: true }}
          keyboard={{
            enabled: true,
          }}
          mousewheel={true}
        >
          {wishlist.map((data) => {
            return (
              <SwiperSlide key={data._id} className="wishlist-swiperslide">
                <ProductCard data={data} key={data._id} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="clear-wishlist-btn">
        <Tooltip
          title="clear all products from wishlist"
          placement="right"
          arrow
        >
          <button
            className="clearwishlist"
            onClick={() => handleClearWishlist()}
          >
            Clear Wishlist <DeleteIcon sx={{ fontSize: 32 }} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
export default WishListContainer;
