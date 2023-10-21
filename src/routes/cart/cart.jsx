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

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="cart-page">
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart is Empty</p>
          <div className="start-shopping">
            <button>
              <Link to="/product"> Start Shopping</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-page-container">
          <CartListContainer cart={cart.cartItems} className="cart-container" />

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
