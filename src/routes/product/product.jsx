import "./product.scss";
import { useSelector } from "react-redux";
import ProductListContainer from "../../components/productcontainer/productlistcontainer/productlist.component";
import FilterContainer from "../../components/filtercontainer/filtercontainer.component";

const Product = () => {
  const auth = useSelector((state) => state.auth);
  const userLoaded = auth.userLoaded;
  return (
    <div className="page-container">
      <FilterContainer />
      <ProductListContainer className="products-container" />
    </div>
  );
};

export default Product;
