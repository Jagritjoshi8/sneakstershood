import "./home.scss";
import PromotionalLinesContainer from "../../components/homecontainers/promtionallinescontainer/promotionalLines.component";
import HeroVideoContainer from "../../components/homecontainers/herovideocontainer/herovideocontainer.component";
import PopularSneakersContainer from "../../components/homecontainers/popularsneakers/popularsneaker.component";
import HighlightProductContainer from "../../components/homecontainers/highlightProductcontainer/highlightProduct.component";
import { useGetAllProductsQuery } from "../../features/productsApi";
import MensContainer from "../../components/homecontainers/menscontainer/menscontainer.component";
import WomenContainer from "../../components/homecontainers/womencontainer/womencontainer";
import KidsContainer from "../../components/homecontainers/kidscontainer/kidscontainer.component";
import FooterContainer from "../../components/extra/footer/footer.component";
import SneakerNewsContainer from "../../components/homecontainers/sneakernews/sneakernews";
import GenderSectionContainer from "../../components/homecontainers/genderSectionContainer/genderSectionContainer";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const od1 = data?.find((product) => product.name === "Enigma Pro X");
  const od2 = data?.find((product) => product.name === "Luminary Synthesis");

  return (
    <div className="app">
      <HeroVideoContainer />
      <PromotionalLinesContainer />
      <PopularSneakersContainer />
      <HighlightProductContainer product={od1} />
      <MensContainer />
      <WomenContainer />
      <HighlightProductContainer product={od2} />
      <KidsContainer />
      <SneakerNewsContainer />
      <GenderSectionContainer />
      <FooterContainer />
    </div>
  );
};

export default Home;
