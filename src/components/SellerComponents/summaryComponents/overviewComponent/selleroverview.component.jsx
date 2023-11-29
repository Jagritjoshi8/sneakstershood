import React from "react";
import "./selleroverview.styles.scss";
import BarChartIcon from "@mui/icons-material/BarChart";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSellerOrder } from "../../../../features/orderSlice";

const SellerOverviewContainer = () => {
  const dispatch = useDispatch();
  const { sellerOrderDetails } = useSelector((state) => state.order);
  const authseller = useSelector((state) => state.authseller);
  const { sellerProducts } = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(getSellerOrder(authseller._id));
  // }, []);
  let todayfilteredOrders = [];
  let yesterdayfilteredOrders = [];
  let ordersIncreasePercentage = 0;
  let todayfilteredproducts = [];
  let yesterdayfilteredproducts = [];
  let productsIncreasePercentage = 0;
  let todaySumOfSellerPrice = 0;
  let yesterdaySumOfSellerPrice = 0;
  let earningsIncreasePercentage = 0;
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // Get today's date in the format "YYYY-MM-DD"
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split("T")[0]; // Get yesterday's date in the format "YYYY-MM-DD"

  if (sellerOrderDetails) {
    todayfilteredOrders = sellerOrderDetails?.sellerOrder?.filter((order) => {
      // Extract the date part from the order's createdAt timestamp
      const orderDate = order.createdAt.split("T")[0];

      // Compare the order date with today's date
      return orderDate === formattedToday;
    });
    todaySumOfSellerPrice = todayfilteredOrders?.reduce((sum, order) => {
      return sum + order.sellerPriceSum;
    }, 0);
    yesterdayfilteredOrders = sellerOrderDetails?.sellerOrder?.filter(
      (order) => {
        // Extract the date part from the order's createdAt timestamp
        const orderDate = order.createdAt.split("T")[0];

        // Compare the order date with yesterday's date
        return orderDate === formattedYesterday;
      }
    );
    yesterdaySumOfSellerPrice = yesterdayfilteredOrders?.reduce(
      (sum, order) => {
        return sum + order.sellerPriceSum;
      },
      0
    );

    ordersIncreasePercentage = Math.floor(
      ((todayfilteredOrders?.length - yesterdayfilteredOrders?.length) /
        yesterdayfilteredOrders?.length) *
        100
    );
    earningsIncreasePercentage = Math.floor(
      ((todaySumOfSellerPrice - yesterdaySumOfSellerPrice) /
        yesterdaySumOfSellerPrice) *
        100
    );
  }
  if (sellerProducts) {
    todayfilteredproducts = sellerProducts?.filter((product) => {
      // Extract the date part from the order's createdAt timestamp
      const productDate = product.createdAt.split("T")[0];

      // Compare the order date with today's date
      return productDate === formattedToday;
    });
    yesterdayfilteredproducts = sellerProducts?.filter((product) => {
      // Extract the date part from the order's createdAt timestamp
      const productDate = product.createdAt.split("T")[0];

      // Compare the order date with today's date
      return productDate === formattedYesterday;
    });
    productsIncreasePercentage = Math.floor(
      ((todayfilteredproducts?.length - yesterdayfilteredproducts?.length) /
        yesterdayfilteredproducts?.length) *
        100
    );
  }
  const per1 = `${ordersIncreasePercentage}`;
  const per2 = `${productsIncreasePercentage}`;
  const per3 = `${earningsIncreasePercentage}`;
  return (
    <div className="seller-overiew-card">
      <h1>Overview</h1>
      <h4>How Your Business Performed Compared To Previous Month.</h4>
      <div className="overview-details">
        <div className="dt">
          <div className="icon1">
            <ContentPasteIcon sx={{ fontSize: 40 }} />{" "}
          </div>
          <div className="idt">
            <p>{todayfilteredOrders?.length}</p>
            <p className="p2"> Orders</p>
          </div>{" "}
          {!per1.includes("-") ? (
            <div className="greenPer">{per1}%</div>
          ) : (
            <div className="redPer">{per1}%</div>
          )}
        </div>
        <div className="dt">
          <div className="icon2">
            <FiberNewIcon sx={{ fontSize: 40 }} />
          </div>{" "}
          <div className="idt">
            <p>{todayfilteredproducts?.length}</p> <p className="p2"> Launch</p>
          </div>{" "}
          {!per2.includes("-") ? (
            <div className="greenPer">{per2}%</div>
          ) : (
            <div className="redPer">{per2}%</div>
          )}
        </div>
        <div className="dt">
          <div className="icon3">
            {" "}
            <BarChartIcon sx={{ fontSize: 43 }} />
          </div>
          <div className="idt">
            <p>${todaySumOfSellerPrice}</p>
            <p className="p2">Earnings</p>
          </div>{" "}
          {!per3.includes("-") ? (
            <div className="greenPer">{per3}%</div>
          ) : (
            <div className="redPer">{per3}%</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOverviewContainer;
