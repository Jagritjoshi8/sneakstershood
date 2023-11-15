import "./wishlist.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WishListContainer from "../../components/wishlistcontainer/wishlist.comonent";
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  return (
    <div className="wishlist-page">
      {wishlist.wishlistItems.length === 0 ? (
        <div className="wishlist-empty"
         data-aos="fade-up"
        data-aos-duration="2500">
          <h1>Your wishlist is Empty</h1>
            <button className="start-shopping-button">
              <Link to="/product"> Start Shopping ⇒</Link>
            </button>
          
          <img src="https://thumbs.dreamstime.com/z/purchase-agreement-concept-vector-illustration-man-doing-purchases-shopping-list-customer-package-buying-goods-app-153245493.jpg"/>
          <div className="white">.</div>
          
        </div>
      ) : (
        <div className="wishlist-page-container">
          <WishListContainer wishlist={wishlist.wishlistItems} />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
