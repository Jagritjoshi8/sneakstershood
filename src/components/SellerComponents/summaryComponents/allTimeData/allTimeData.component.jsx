import React from "react";
import "./allTimeData.styles.scss";

const AllTimeDataContainer = () => {
  const transaction = [
    { name: "Total Product Launched", amount: "20" },
    { name: "Total Orders Recevied", amount: "70" },
    { name: "Current Pending Orders", amount: "10" },
    { name: "Total Earning", amount: "$50000" },
    // { name: "john", amount: "500", time: "7" },
  ];
  return (
    <div className="allTimeDataContainer">
      <h2>All Time Stats</h2>
      {transaction.map((tran) => {
        return (
          <div className="single-transaction">
            <p>{tran.name}</p>
            <p>{tran.amount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AllTimeDataContainer;
