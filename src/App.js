import { useState, useEffect } from "react";
import "./App.scss";
import HeroContainer from "./components/herocontainer/herocontainer.component";

const App = () => {
  const containeritems = [
    {
      id: "1",
      title: "Nike A1",
      img: "https://i8.amplience.net/i/jpl/desktop-middle-banner-1704x740-1577bee06e25317e00000efd38bee5b8?qlt=90&amp;fmt=auto",
    },
    {
      id: "2",
      title: "Nike A2",
      img: "https://i8.amplience.net/i/jpl/mobile-site-middle-banner-672x672-87f9872e1598a27005807ef8af88f7df?qlt=90&amp;fmt=auto",
    },
  ];

  return (
    <div className="app">
      <HeroContainer container={containeritems} />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          praesentium hic sint nulla, et ab, maiores nostrum debitis in labore,
          blanditiis aliquam reprehenderit. Rerum error eum esse, quisquam
          doloribus ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Rem voluptas molestias vitae laborum a libero ipsa tempore
          laboriosam eos, fuga cupiditate eaque, aspernatur aperiam eius
          officiis exercitationem pariatur iste natus.
        </p>
        <p>d</p>
      </div>
    </div>
  );
};

export default App;

{
  /* <div className="swiper-slide swiper-slide-active" style="width: 721px;">
        <a data-ip-position="CarouselCE-2__slide-1" data-ip-name="https://i8.amplience.net/i/jpl/desktop-middle-banner-1704x740-1577bee06e25317e00000efd38bee5b8?qlt=90&amp;fmt=auto" href="/brand/asics/" class="slide-inner slide-0 ga-ip">
          
          <h1 class="slide-title" style="color: black; left: 50%;"></h1> <picture data-v-fe5e9fe6="" class="slide-image c-placeholder" style="padding-bottom: 43.4272%;">
            <source data-v-fe5e9fe6="" srcset="https://i8.amplience.net/i/jpl/mobile-site-middle-banner-672x672-87f9872e1598a27005807ef8af88f7df?qlt=90&amp;fmt=auto" media="(max-width: 765px)"> 
            <img data-v-fe5e9fe6="" alt="" data-src="https://i8.amplience.net/i/jpl/desktop-middle-banner-1704x740-1577bee06e25317e00000efd38bee5b8?qlt=90&amp;fmt=auto" src="https://i8.amplience.net/i/jpl/desktop-middle-banner-1704x740-1577bee06e25317e00000efd38bee5b8?qlt=90&amp;fmt=auto" class="lazy">
              </picture> 
            
              </a>
            </div>
 */
}
