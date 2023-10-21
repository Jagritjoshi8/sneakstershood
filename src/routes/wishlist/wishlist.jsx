import "./wishlist.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WishListContainer from "../../components/wishlistcontainer/wishlist.comonent";
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  return (
    <div className="wishlist-page">
      {wishlist.wishlistItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your wishlist is Empty</p>
          <div className="start-shopping">
            <button>
              <Link to="/product"> Start Shopping</Link>
            </button>
          </div>
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
