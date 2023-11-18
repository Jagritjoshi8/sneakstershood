import React from "react";
import "./latestTransaction.styles.scss";

const LatestTransactionContainer = () => {
  const transaction = [
    { name: "John", amount: "500", time: "7" },
    { name: "Tom Mathew", amount: "1500", time: "13" },
    { name: "sara jameson", amount: "500", time: "21" },
    // { name: "john", amount: "500", time: "7" },
  ];
  return (
    <div className="LatestTransactionContainer">
      <h2>Latest Transactions</h2>
      {transaction.map((tran) => {
        return (
          <div className="single-transaction">
            <p>{tran.name}</p>
            <p>${tran.amount}</p>
            <p>{tran.time} hours ago</p>
          </div>
        );
      })}
    </div>
  );
};

export default LatestTransactionContainer;
