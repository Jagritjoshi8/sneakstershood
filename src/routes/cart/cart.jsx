import CartListContainer from "../../components/cartcontainer/cartlistcontainer/cartlist.component";
import "./cart.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTotals } from "../../features/cartSlice";
import SummaryContainer from "../../components/summarycontainer/summary.component";
import { CouponsContainer } from "../../components/coupons/coupons.component";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const latestCartItems = cart.cartItems?.slice().reverse();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="cart-page">
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty" data-aos="fade-up" data-aos-duration="2500">
          <h1>Your Cart is Empty</h1>
          <button className="start-shopping-button">
            <Link to="/product"> Start Shopping ⇒</Link>
          </button>

          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7236766-5875081.png" />
        </div>
      ) : (
        <div className="cart-page-container">
          <CartListContainer
            cart={latestCartItems}
            className="cart-container"
          />

          <div className="cart-side-container">
            <CouponsContainer cart={cart} />
            <SummaryContainer cart={cart} />
          </div>
        </div>
      )}

      {/* <ProductListContainer className="products-container" /> */}
      {/* {products.map((data) => {
        return (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <p>{data.original_price}</p>
          </div>
        );
      })} */}

      {/* <h2>this is product section</h2>
      <Outlet />
      <h3>this is fixed filter component</h3> */}
    </div>
  );
};

export default Cart;
