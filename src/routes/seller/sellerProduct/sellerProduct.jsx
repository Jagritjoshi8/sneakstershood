import React from "react";
import "./sellerProduct.scss";
import { Link, NavLink, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import CreateProductContainer from "../../../components/SellerComponents/sellerProductComponent/createProductContainer/createProduct.component";
import GetSellerProductsContainer from "../../../components/SellerComponents/sellerProductComponent/getSellerProducts/getSellerPrducts.comoponent";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SellerProduct = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="seller-product">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="basic tabs example"
      >
        <Tab
          label={<span className="tabsize">Create Products</span>}
          {...a11yProps(0)}
          className="tab1"
        />
        <Tab
          label={<span className="tabsize">My All Products</span>}
          {...a11yProps(1)}
        />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <CreateProductContainer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GetSellerProductsContainer />
      </CustomTabPanel>
    </div>
  );
};

export default SellerProduct;
