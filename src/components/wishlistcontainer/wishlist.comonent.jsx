import "./wishlist.styles.scss";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ProductCard from "../productcontainer/productcardcontainer/productcard.component";

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
        <h1>WishList</h1> <FavoriteBorderOutlinedIcon sx={{ fontSize: 35 }} />{" "}
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
        <button className="clearwishlist" onClick={() => handleClearWishlist()}>
          Clear Wishlist <DeleteIcon sx={{ fontSize: 32 }} />
        </button>
      </div>
    </div>
  );
};
export default WishListContainer;
