import { useState, useEffect } from "react";
import "./home.scss";
import HeroContainer from "../../components/herocontainer/herocontainer.component";

const Home = () => {
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

export default Home;
