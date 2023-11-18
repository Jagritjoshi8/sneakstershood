import React from "react";
import "./selleroverview.styles.scss";
import BarChartIcon from "@mui/icons-material/BarChart";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const SellerOverviewContainer = () => {
  const per1 = "20%";
  const per2 = "10%";
  const per3 = "-10%";
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
            <p>5</p>
            <p className="p2"> Orders</p>
          </div>{" "}
          {!per1.includes("-") ? (
            <div className="greenPer">{per1}</div>
          ) : (
            <div className="redPer">{per1}</div>
          )}
        </div>
        <div className="dt">
          <div className="icon2">
            <FiberNewIcon sx={{ fontSize: 40 }} />
          </div>{" "}
          <div className="idt">
            <p>3</p> <p className="p2"> Launch</p>
          </div>{" "}
          {!per2.includes("-") ? (
            <div className="greenPer">{per2}</div>
          ) : (
            <div className="redPer">{per2}</div>
          )}
        </div>
        <div className="dt">
          <div className="icon3">
            {" "}
            <BarChartIcon sx={{ fontSize: 43 }} />
          </div>
          <div className="idt">
            <p>$3000</p>
            <p className="p2">Earnings</p>
          </div>{" "}
          {!per3.includes("-") ? (
            <div className="greenPer">{per3}</div>
          ) : (
            <div className="redPer">{per3}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOverviewContainer;
