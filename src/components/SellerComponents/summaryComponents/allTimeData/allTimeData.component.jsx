import React from "react";
import "./allTimeData.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getDeletedSellerProducts,
  getSellerProducts,
} from "../../../../features/productSlice";
import { getSellerOrder } from "../../../../features/orderSlice";

const AllTimeDataContainer = () => {
  const dispatch = useDispatch();
  const authseller = useSelector((state) => state.authseller);
  useEffect(() => {
    dispatch(getSellerProducts(authseller._id));
    dispatch(getDeletedSellerProducts(authseller._id));
    dispatch(getSellerOrder(authseller._id));
  }, []);
  const { sellerProducts, deletedSellerProducts } = useSelector(
    (state) => state.products
  );
  const { sellerOrderDetails } = useSelector((state) => state.order);
  let pendingOrders = [];
  let totalEarnings = "";
  if (sellerOrderDetails) {
    pendingOrders = sellerOrderDetails?.sellerOrder?.filter(
      (order) => order.orderStatus === "Pending"
    );

    totalEarnings = sellerOrderDetails?.sellerOrder?.reduce(
      (totalSum, order) => totalSum + order.sellerPriceSum,
      0
    );
  }
  const transaction = [
    {
      name: "Total Product Launched",
      amount: `${sellerProducts.length + deletedSellerProducts.length}`,
    },
    {
      name: "Total Orders Recevied",
      amount: `${sellerOrderDetails?.sellerOrder?.length}`,
    },
    { name: "Current Pending Orders", amount: `${pendingOrders?.length}` },
    { name: "Total Earning", amount: `$${totalEarnings}` },
  ];
  return (
    <div className="allTimeDataContainer">
      <h2>All Time Stats</h2>
      {transaction.map((tran) => {
        return (
          <div className="single-transaction" key={tran.name}>
            <p>{tran.name}</p>
            <p>{tran.amount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AllTimeDataContainer;
