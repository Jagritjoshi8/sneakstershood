import "./herocontainer.styles.scss";
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
import { Link } from "react-router-dom";

const HeroContainer = ({ container }) => {
  return (
    <Swiper
      className="herocontainer"
      modules={[
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        Mousewheel,
        Autoplay,
        Keyboard,
      ]}
      spaceBetween={1}
      slidesPerView={1}
      navigation
      //   pagination={{ clickable: true }}
      pagination={{ dynamicBullets: true }}
      loop={true}
      centeredSlides={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      keyboard={{
        enabled: true,
      }}
      mousewheel={true}
      //   scrollbar={{ draggable: true }}
      //   onSlideChange={() => console.log("slide change")}
      //   onSwiper={(swiper) => console.log(swiper)}
    >
      {container.map((items) => {
        return (
          <SwiperSlide key={items.id}>
            <h1 className="heroitemtitle">{items.title}</h1>
            <Link to={`product`}>
              <img
                src={items.img}
                width="99%"
                height="600"
                className="heroitemimg"
              />
              <button className="herocontainerbutton">Shop Now</button>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>

    // <div>
    //   {container.map((items) => {
    //     return (
    //       <div>
    //         <h1>{items.title}</h1>
    //         <img src={items.img} width="99%" height="600" />
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

//  <SwiperSlide>
//         <h1>kk</h1>
//       </SwiperSlide>
//       <SwiperSlide>
//         <h1>ll</h1>
//       </SwiperSlide>
//       <SwiperSlide>Slide 2</SwiperSlide>
//       <SwiperSlide>Slide 3</SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide>
export default HeroContainer;
