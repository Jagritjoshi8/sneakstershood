import "./cartcard.styles.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tilt from "react-parallax-tilt";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
} from "../../../features/cartSlice";
const CartCard = ({ product }) => {
  const {
    id,
    name,
    original_price,
    discounted_price,
    category_name,
    size,
    img,
    cartQuantity,
  } = product;
  const dispatch = useDispatch();
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleIncreaseCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div
      className="cart-card"
      data-aos="flip-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1800"
    >
      <DeleteIcon
        sx={{ fontSize: 38 }}
        color="secondary"
        className="cart-icon"
        onClick={() => handleRemoveFromCart(product)}
      />
      <Link to={`/product-details/${id}`}>
        <div className="cart-card-image">
          <Tilt
            transitionSpeed={2000}
            tiltMaxAngleX={35}
            tiltMaxAngleY={35}
            scale={1.4}
          >
            <img src={img} />
          </Tilt>
          <h3>{name}</h3>
        </div>
      </Link>

      <p>Gender: {category_name}</p>
      <p>Size: {size}</p>
      <p>Price:${discounted_price}</p>
      <div className="quantity-card">
        Qunatity:
        <RemoveCircleIcon
          color="secondary"
          className="cart-icon"
          onClick={() => handleDecreaseCart(product)}
        />
        <b>{cartQuantity}</b>
        <AddCircleIcon
          // sx={{ fontSize: 38 }}
          color="secondary"
          className="cart-icon"
          onClick={() => handleIncreaseCart(product)}
        />
      </div>
      <p>Total Price: ${discounted_price * cartQuantity}</p>
    </div>
  );
};

export default CartCard;
