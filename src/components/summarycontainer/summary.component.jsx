import "./summary.styles.scss";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cartSlice";

const SummaryContainer = ({ cart }) => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const isCouponApplied = cart.couponSelected.length ? true : false;

  return (
    <div className="summary-container">
      <div className="calculation-container">
        <div>
          <h1>Summary</h1>
          <hr />
        </div>

        <div>
          <div className="titlevaluepair og-price">
            <h3>Original Total ({cart.cartTotalQuantity} items)</h3>
            <b className="original-price">${cart.cartOgTotalAmount}</b>
          </div>

          <div className="titlevaluepair">
            <h3>Discount</h3>
            <b>- ${cart.cartOgTotalAmount - cart.cartTotalAmount}</b>
          </div>
        </div>
        <hr />
        <div className="titlevaluepair">
          <h3>Special Price:</h3>{" "}
          <b className="fprice spprice">${cart.cartTotalAmount}</b>
        </div>
        {isCouponApplied && (
          <div className="titlevaluepair">
            <h3>Coupon Discount</h3> <b>- ${cart.totalCouponDiscount}</b>
          </div>
        )}

        <div className="titlevaluepair">
          <h3>Delivery &amp; Packing charge</h3>
          <b> + $50</b>
        </div>

        <hr />
        <div className="titlevaluepair total-amount">
          <h1>Total Amount</h1>
          <b className="fprice">${cart.cartFTotalAmount}</b>
          {/* <b className="fprice">
            ${cart.cartTotalAmount - totalCouponDiscount + 50}
          </b> */}
        </div>
      </div>
      {cart.cartOgTotalAmount - cart.cartFTotalAmount > 0 ? (
        <div className="savings-discount">
          <p>
            You saved{" "}
            <b>
              ${(cart.cartOgTotalAmount - cart.cartFTotalAmount).toFixed(2)}
            </b>{" "}
            from purchase
          </p>
        </div>
      ) : (
        <p></p>
      )}
      <div className="cartorder-buttons">
        <button className="clearcart" onClick={() => handleClearCart()}>
          Clear Cart ❌
        </button>
        <button className="placeorder">Place Order ✅ </button>
      </div>
    </div>
  );
};

export default SummaryContainer;
