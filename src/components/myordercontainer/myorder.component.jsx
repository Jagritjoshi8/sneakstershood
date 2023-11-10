import "./myorder.styles.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Navigate, useNavigate } from "react-router";

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
const MyOrderContainer = ({ orderDetails }) => {
  const navigate = useNavigate();
  console.log(orderDetails);
  const order = orderDetails.userOrder;
  const reversedOrders = order?.slice().reverse();
  console.log("revorder", reversedOrders);
  // }
  return (
    <div
      className="myorder-container"
      data-aos="fade-up"
      // data-aos-easing="linear"
      data-aos-duration="2500"
    >
      {orderDetails.length < 1 ? (
        <div>You Have No Order Placed </div>
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

                  <p className="p2">Pending</p>
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
                    // loop={true}
                    centeredSlidesBounds={true}
                  >
                    {order.orderItems.map((product) => {
                      return (
                        <SwiperSlide
                          key={product.id}
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
                                    className="cart-icon"
                                    onClick={() =>
                                      navigate(`/product-details/${product.id}`)
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
                              image={product.img}
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
                    {/* {wishlist.map((data) => {
                      return (
                        <SwiperSlide
                          key={data.id}
                          className="wishlist-swiperslide"
                        >
                          <ProductCard data={data} key={data.id} />
                        </SwiperSlide>
                      );
                    })} */}
                  </Swiper>
                  {/* {order.orderItems.map((product) => {
                    return (
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
                                sx={{ fontSize: 38 }}
                                color="secondary"
                                className="cart-icon"
                                onClick={() =>
                                  navigate(`/product-details/${product.id}`)
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
                          image={product.img}
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
                              {product.discounted_price * product.cartQuantity}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })} */}
                </div>
                {/* <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image=""
                    alt="Paella dish"
                  />
                  <CardContent>
                    <div>
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            );
          })}
        </div>
      )}
      {/* {cart.map((product) => {
        return <CartCard product={product} key={product.id} />;
      })} */}
    </div>
  );
};
export default MyOrderContainer;
