import CartCard from "../cartcardcontainer/cartcard.component";
import "./cartlist.styles.scss";

const CartListContainer = ({ cart }) => {
  return (
    <div className="cart-card-container">
      {cart.map((product) => {
        return <CartCard product={product} key={product.id} />;
      })}
    </div>
  );
};
export default CartListContainer;
