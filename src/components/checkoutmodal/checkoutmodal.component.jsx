import "./checkoutmodal.styles.scss";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { clearCart } from "../../features/cartSlice";

const CheckoutModal = ({ open, onClose }) => {
  let currentDate = new Date();
  const newDate = new Date(currentDate.setDate(currentDate.getDate() + 10));
  const deliverableDate = `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
  const key_id = "rzp_test_bLjWA3GJDD9QYI";
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const tokendata = jwtDecode(auth.token);
  const navigate = useNavigate();

  let srno = 0;

  const checkoutHandler = async (amount) => {
    const {
      data: { order },
    } = await axios.post("http://localhost:8000/payments/checkout", {
      coustomerDetails: {
        id: tokendata.id,
        name: tokendata.name,
        email: tokendata.email,
        contact: tokendata.phonenumber,
      },
      deliveryAddress: tokendata.address,
      deliveryDate: deliverableDate,
      orderItems: cart.cartItems,
      amount,
    });
    const options = {
      key: key_id,
      amount: order.amount,
      currency: "INR",
      name: "Sneaksters Hood",
      description: "Payment for Sneakers ",
      image:
        "https://i.pinimg.com/originals/11/34/70/113470616e0bdea3c1cf26e4726e74ad.jpg",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8000/payments/verification";
          const { data } = await axios.post(verifyUrl, response);
          dispatch(clearCart());
          localStorage.removeItem("cartItems");
          navigate("/");
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },

      //   callback_url: "http://localhost:8000/payments/verification",
      prefill: {
        name: tokendata.name,
        email: tokendata.email,
        contact: tokendata.phonenumber,
      },
      notes: {
        address: tokendata.address,
      },
      theme: {
        color: "#9951f0",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
    //console.log(data);
  };
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            <CloseIcon
              sx={{ fontSize: 40 }}
              color="secondary"
              className="cart-icon"
            />
          </p>
          <div className="content">
            <div>
              <h1> Your Order Is Reday !!</h1>
              <p>
                <b>Ordered By: </b> {tokendata.name}
              </p>
              <p>
                <b>Deliverable To: </b> {tokendata.address}
              </p>
              <p>
                <b>Deliverable By: </b> {deliverableDate} (Estimated 10 days)
              </p>
              <p>
                <b>Contact Details: </b>
                <p>
                  <b>Email: </b> {tokendata.email}
                </p>
                <p>
                  <b>Contact Number: </b> {tokendata.phonenumber}
                </p>
              </p>
            </div>
            <div className="table-content">
              <h2>Order Details:</h2>
              <hr />
              <table>
                <tr className="table-headers">
                  <th>Sr No.</th>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Quantity </th>
                  <th>Price</th>
                </tr>
                {cart.cartItems.map((product) => {
                  srno++;
                  return (
                    <tr key="product.id">
                      <td>{srno}</td>
                      <td>
                        <Link to={`/product-details/${product.id}`}>
                          <div className="cart-card-image">
                            <Tilt
                              transitionSpeed={2000}
                              tiltMaxAngleX={35}
                              tiltMaxAngleY={35}
                              scale={1.4}
                            >
                              <img src={product.img} />
                            </Tilt>
                            <h3>{product.name}</h3>
                          </div>
                        </Link>
                      </td>
                      <td>{product.size}</td>
                      <td>{product.cartQuantity}</td>
                      <td>
                        ₹{product.discounted_price * product.cartQuantity}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th colSpan="4" align="right" className="table-result">
                    Total Price:{" "}
                  </th>{" "}
                  <td>₹{cart.cartTotalAmount}</td>
                </tr>
                {cart.totalCouponDiscount > 0 ? (
                  <tr>
                    <th colSpan="4" align="right" className="table-result">
                      Extra Discount:{" "}
                    </th>
                    <td>- ₹{cart.totalCouponDiscount}</td>
                  </tr>
                ) : null}
                <tr>
                  <th colSpan="4" align="right" className="table-result">
                    Shipping Charge:{" "}
                  </th>
                  <td>₹50</td>
                </tr>
                <tr className="final-result">
                  <th
                    colSpan="4"
                    align="right"
                    className="table-result final-result"
                  >
                    Amount To Pay:{" "}
                  </th>
                  <th className="final-result-amount">
                    ₹{cart.cartFTotalAmount}
                  </th>
                </tr>
              </table>
            </div>
          </div>
          <div className="btnContainer">
            <button className="btnOutline" onClick={onClose}>
              <span className="bold">NO</span>, thanks
            </button>
            <button
              className="btnPrimary"
              onClick={() => checkoutHandler(cart.cartFTotalAmount)}
            >
              <span className="bold">YES</span>, Proceed To Pay
            </button>
          </div>
        </div>
        <img
          src="https://cdn.dribbble.com/users/3956332/screenshots/15361468/checkout_4x.jpg"
          alt="/"
          className="modal-img"
        />
      </div>
    </div>
  );
};

export default CheckoutModal;
