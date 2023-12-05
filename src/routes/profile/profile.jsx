import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./profile.scss";
import { signoutUser } from "../../features/authSlice";
import { getUserOrder } from "../../features/orderSlice";
import MyOrderContainer from "../../components/myordercontainer/myorder.component";
import MyMapContainer from "../../components/mymapcontainer/mymapcontainer.component";
import { clearCart } from "../../features/cartSlice";
import { clearWishList } from "../../features/wishlistSlice";

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

const Profile = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const token = auth.token;
  const tokendata = jwtDecode(token);
  const order = useSelector((state) => state.order);
  const [value, setValue] = useState(0);
  let imageURL;
  if (tokendata.profileimg) {
    imageURL = `http://localhost:8000/${tokendata.profileimg}`;
  } else {
    imageURL = `https://robohash.org/${tokendata.name}4?set=set5&size=250x250`;
  }

  useEffect(() => {
    dispatch(getUserOrder(tokendata.id));
  }, [auth, dispatch]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const signOutHandler = async () => {
    dispatch(signoutUser());
    dispatch(clearCart());
    dispatch(clearWishList());
    navigate("/sign-in");
  };
  return (
    <div
      className="profile-container"
      data-aos="zoom-in-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1500"
    >
      <div className="profile-details">
        <div className="profile-hero-section">
          <div className="profileimg-view">
            <img src={imageURL} />
          </div>
          <div className="profile-hero-details">
            <p>
              <strong>Name:</strong> {tokendata.name}
            </p>
            <p>
              <strong>Email:</strong> {tokendata.email}
            </p>
          </div>
          <div className="profile-hero-details">
            <button className="sign-out-button" onClick={signOutHandler}>
              Sign Out
            </button>
          </div>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab
            label={<span className="tabsize">My Orders</span>}
            {...a11yProps(0)}
            className="tab1"
          />
          <Tab
            label={<span className="tabsize">My Personal Info</span>}
            {...a11yProps(1)}
          />
          <Tab
            label={<span className="tabsize">My Address</span>}
            {...a11yProps(2)}
          />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <MyOrderContainer orderDetails={order.orderDetails} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="my-personalinfo-section">
            <img
              src="https://i.pinimg.com/originals/89/26/b3/8926b38fa8cddebab8f4f1866bf09002.png"
              height="500px"
              width="750px"
              className="i1"
            />
            <div data-aos="fade-in" data-aos-duration="2000">
              {" "}
              <p>
                <strong>Name:</strong> {tokendata.name}
              </p>
              <p>
                <strong>Email:</strong> {tokendata.email}
              </p>
              <p>
                <strong>Age:</strong> {tokendata.age}
              </p>
              <p>
                <strong>Gender:</strong> {tokendata.gender}
              </p>
              <p>
                <strong>Phone Number:</strong> {tokendata.phonenumber}
              </p>
              <p>
                <strong>Address:</strong> {tokendata.address}
              </p>
            </div>
            <img
              src=" https://purpleant.io/wp-content/uploads/2022/10/Privacy-policy-amico-1-1.png"
              height="350px"
              className="i2"
            />
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <MyMapContainer />
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default Profile;
