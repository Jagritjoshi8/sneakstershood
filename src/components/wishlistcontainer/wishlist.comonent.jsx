import "./wishlist.styles.scss";
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

const WishListContainer = ({ wishlist }) => {
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
          //   pagination={{ type: "progressbar" }}
          freeMode={true}
          pagination={{ dynamicBullets: true }}
          // loop={true}
          // centeredSlides={true}
          // centeredSlidesBounds={true}
          //   autoplay={{
          //     delay: 1000,
          //     disableOnInteraction: false,
          //   }}
          keyboard={{
            enabled: true,
          }}
          mousewheel={true}
          //   scrollbar={{ draggable: true }}
          //   onSlideChange={() => console.log("slide change")}
          //   onSwiper={(swiper) => console.log(swiper)}
        >
          {wishlist.map((data) => {
            return (
              <SwiperSlide key={data.id} className="wishlist-swiperslide">
                <ProductCard data={data} key={data.id} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
export default WishListContainer;
