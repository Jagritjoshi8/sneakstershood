import React from "react";
import "./latestTransaction.styles.scss";
import { useSelector } from "react-redux";

const LatestTransactionContainer = () => {
  const { sellerOrderDetails } = useSelector((state) => state.order);

  return (
    <div className="LatestTransactionContainer">
      <h2>Latest Transactions</h2>
      <div>
        {sellerOrderDetails?.sellerOrder?.length > 0 &&
          sellerOrderDetails?.sellerOrder
            .slice()
            .reverse()
            .slice(0, 3)
            .map((order) => {
              const currentTime = new Date().getTime();
              const createdAtTimestamp = new Date(
                `${order.createdAt}`
              ).getTime();
              const timeDifference = currentTime - createdAtTimestamp;
              const timeDifferenceInSeconds = timeDifference / 1000;
              const timeDifferenceInMinutes = Math.floor(
                timeDifferenceInSeconds / 60
              );
              const timeDifferenceInHours = Math.floor(
                timeDifferenceInMinutes / 60
              );
              const timeDifferenceInDays = Math.floor(
                timeDifferenceInHours / 24
              );
              return (
                <div className="single-transaction" key={order._id}>
                  <p>{order?.coustomerDetails?.name}</p>
                  <p>${order?.sellerPriceSum}</p>
                  {timeDifferenceInDays > 0 ? (
                    <p>{timeDifferenceInDays} Day Before</p>
                  ) : timeDifferenceInHours > 0 ? (
                    <p>{timeDifferenceInHours} Hours Ago</p>
                  ) : (
                    <p>{timeDifferenceInMinutes} Minutes Ago</p>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default LatestTransactionContainer;
