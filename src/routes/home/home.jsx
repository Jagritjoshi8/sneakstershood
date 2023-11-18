import { useState, useEffect } from "react";
import "./home.scss";
import HeroContainer from "../../components/homecontainers/herocontainer/herocontainer.component";
import PromotionalLinesContainer from "../../components/homecontainers/promtionallinescontainer/promotionalLines.component";
import HeroVideoContainer from "../../components/homecontainers/herovideocontainer/herovideocontainer.component";
import PopularSneakersContainer from "../../components/homecontainers/popularsneakers/popularsneaker.component";
import HighlightProductContainer from "../../components/homecontainers/highlightProductcontainer/highlightProduct.component";
import { useGetAllProductsQuery } from "../../features/productsApi";
import MensContainer from "../../components/homecontainers/menscontainer/menscontainer.component";
import WomenContainer from "../../components/homecontainers/womencontainer/womencontainer";
import KidsContainer from "../../components/homecontainers/kidscontainer/kidscontainer.component";
import FooterContainer from "../../components/extra/footer/footer.component";

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
  const { data, error, isLoading } = useGetAllProductsQuery();

  const od1 = data?.find((product) => product.name === "Enigma Pro X");
  const od2 = data?.find((product) => product.name === "Luminary Synthesis");
  //console.log("od1", od1);

  return (
    <div className="app">
      {/* <HeroContainer container={containeritems} /> */}
      <HeroVideoContainer />
      <PromotionalLinesContainer />
      <PopularSneakersContainer />
      <HighlightProductContainer product={od1} />
      <MensContainer />
      <WomenContainer />
      <HighlightProductContainer product={od2} />
      <KidsContainer />
      <FooterContainer />

      <div></div>
    </div>
  );
};

export default Home;
