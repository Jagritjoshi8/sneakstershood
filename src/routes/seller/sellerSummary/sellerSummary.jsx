import React from "react";
import "./sellerSummary.styles.scss";
import SellerOverviewContainer from "../../../components/SellerComponents/summaryComponents/overviewComponent/selleroverview.component";
import SellerChartContainer from "../../../components/SellerComponents/summaryComponents/sellerChartComponent/sellerChart.component";
import LatestTransactionContainer from "../../../components/SellerComponents/summaryComponents/latestTransactionComponent/latestTransaction.component";
import AllTimeDataContainer from "../../../components/SellerComponents/summaryComponents/allTimeData/allTimeData.component";

const SellerSummary = () => {
  return (
    <div
      className="seller-summary-page"
      data-aos="fade-up"
      data-aos-duration="1900"
    >
      <div className="sellerSummary-left-sec">
        <SellerOverviewContainer />
        <SellerChartContainer />
      </div>
      <div className="sellerSummary-right-sec">
        <LatestTransactionContainer />
        <AllTimeDataContainer />
      </div>
    </div>
  );
};

export default SellerSummary;
