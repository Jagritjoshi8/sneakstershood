import CartCard from "../cartcardcontainer/cartcard.component";
import "./cartlist.styles.scss";

const CartListContainer = ({ cart }) => {
  return (
    <div
      className="cart-card-container"
      data-aos="flip-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1800"
    >
      {cart.map((product) => {
        return <CartCard product={product} key={product._id} />;
      })}
    </div>
  );
};
export default CartListContainer;
