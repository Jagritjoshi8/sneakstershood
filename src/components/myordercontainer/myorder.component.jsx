import "./myorder.styles.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Navigate, useNavigate } from "react-router";
import Tooltip from "@mui/material/Tooltip";
import ReceiptUserModal from "../receiptUserModal/receiptUserModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Mousewheel,
  Autoplay,
  Keyboard,
} from "swiper/modules";

import "swiper/css/bundle";
import { Link } from "react-router-dom";

const MyOrderContainer = ({ orderDetails }) => {
  const navigate = useNavigate();
  console.log(orderDetails);
  const order = orderDetails.userOrder;
  const reversedOrders = order?.slice().reverse();
  console.log("revorder", reversedOrders);

  return (
    <div
      className="myorder-container"
      data-aos="fade-up"
      data-aos-duration="2500"
    >
      {orderDetails.length < 1 ? (
        <div className="no-order-yet-outer">
          <img
            src="https://th.bing.com/th/id/R.323dcb0b2aab1ff58c9bdc0eff03e61f?rik=FY5DQua1UgJ2vw&riu=http%3a%2f%2fwww.valiantica.com%2fimages%2fdigital-technology-img3.png&ehk=tCTevQVbYm6GbYz6bXUaDyMlUAT86IPAmUss%2fN9o220%3d&risl=&pid=ImgRaw&r=0"
            className="oi1"
          />
          <div
            className="no-order-yet"
            data-aos="fade-right"
            data-aos-duration="2500"
          >
            <div>
              <h1>You Have No Order Yet Placed</h1>
            </div>
            <button className="start-shopping-button">
              <Link to="/product"> Start Shopping ⇒</Link>
            </button>
          </div>
          <img
            src="https://thumbs.dreamstime.com/b/online-shopping-concept-man-chooses-buys-products-store-vector-illustration-211662375.jpg"
            className="oi2"
          />
        </div>
      ) : (
        <div>
          <div className="total-order">
            <h2>
              ► Your Total Orders:{"  "}
              {orderDetails.totalOrders}
            </h2>
          </div>
          {reversedOrders.map((order, index) => {
            return (
              <div key="order._id" className="full-order-container">
                <div className="orderid-pending">
                  <div className="inner-orderid-container">
                    <p>
                      <span>
                        OrderNo: {orderDetails.userOrder.length - index}
                      </span>
                    </p>
                    {index === 0 ? (
                      <p className="neworder-info">New Order</p>
                    ) : (
                      <p></p>
                    )}
                  </div>

                  <div className="user-order-status">
                    <Tooltip title="Order Status">
                      {order.orderStatus ? (
                        order.orderStatus === "Pending" ? (
                          <div className="pending">Pending</div>
                        ) : order.orderStatus === "Dispatched" ? (
                          <div className="dispatched">Dispatched</div>
                        ) : (
                          <div className="delivered">Delivered</div>
                        )
                      ) : (
                        "Pending"
                      )}
                    </Tooltip>
                    <ReceiptUserModal
                      orderId={order._id}
                      orderNo={orderDetails.userOrder.length - index}
                    />
                  </div>
                </div>
                <div className="delivery-date-address">
                  {" "}
                  <p>
                    <span>OrderID:</span> {order._id}
                  </p>
                </div>

                <div className="delivery-date-address">
                  <p>
                    <span>Delivery Date:</span> {order.deliveryDate}
                  </p>
                  <p className="p2">
                    <span>Delivery Address:</span> {order.deliveryAddress}
                  </p>
                </div>
                <p>
                  <span>Amount Paid:</span> ₹{order.order.amount / 100} ✅
                </p>
                <div className="order-items-container">
                  <Swiper
                    className="order-container"
                    modules={[
                      Navigation,
                      Pagination,
                      Scrollbar,
                      EffectCoverflow,
                      A11y,
                      Mousewheel,
                      Autoplay,
                      Keyboard,
                    ]}
                    spaceBetween={30}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    pagination={true}
                    centeredSlidesBounds={true}
                  >
                    {order.orderItems.map((product) => {
                      let bkimg;
                      if (product) {
                        if (product.img?.includes("uploads")) {
                          bkimg = `http://localhost:8000/${product.img}`;
                        } else {
                          bkimg = product.img;
                        }
                      }
                      return (
                        <SwiperSlide
                          key={product._id}
                          className="order-swiperlist"
                        >
                          <Card
                            sx={{ maxWidth: 345 }}
                            raised="true"
                            className="order-card"
                          >
                            <CardHeader
                              titleTypographyProps={{
                                fontSize: 21,
                              }}
                              subheaderTypographyProps={{
                                fontSize: 15,
                              }}
                              avatar={
                                <Avatar
                                  sx={{ bgcolor: "purple" }}
                                  aria-label="recipe"
                                >
                                  {product.name.slice(0, 1)}
                                </Avatar>
                              }
                              action={
                                <IconButton aria-label="settings">
                                  <KeyboardDoubleArrowRightIcon
                                    className="order-linkbutton"
                                    sx={{ fontSize: 38 }}
                                    color="secondary"
                                    onClick={() =>
                                      navigate(
                                        `/product-details/${product._id}`
                                      )
                                    }
                                  />
                                </IconButton>
                              }
                              title={product.name}
                              subheader="Brand: Nike"
                            />
                            <CardMedia
                              className="z-rotate-img"
                              component="img"
                              height="204"
                              image={bkimg}
                              alt="sneaker"
                            />
                            <CardContent className="order-content">
                              <div>
                                Size Purchased: <span>{product.size}</span>
                              </div>
                              <div className="purchase-content">
                                Purchasing Price:{" "}
                                <span> ₹{product.discounted_price}</span>
                                <div className="inner-purchase">
                                  x<span>{product.cartQuantity} </span>qty
                                </div>
                              </div>{" "}
                              <div>
                                <span>
                                  {" "}
                                  Total Price: ₹
                                  {product.discounted_price *
                                    product.cartQuantity}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MyOrderContainer;
