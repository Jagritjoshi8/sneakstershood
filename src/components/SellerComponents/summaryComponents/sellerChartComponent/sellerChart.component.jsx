import React from "react";
import "./sellerChart.styles.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SellerChartContainer = () => {
  const data = [
    {
      day: "Sun",
      amount: 2100,
    },
    {
      day: "Mon",
      amount: 1400,
    },
    {
      day: "Tue",
      amount: 910,
    },
    {
      day: "Wed",
      amount: 2190,
    },
    {
      day: "Thrus",
      amount: 2000,
    },
    {
      day: "Fri",
      amount: 3001,
    },
    {
      day: "Sat",
      amount: 2559,
    },
  ];
  return (
    <div className="SellerChartContainer">
      <h2>Last 7 days Earnings :</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#464380"
            activeDot={{ r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerChartContainer;
