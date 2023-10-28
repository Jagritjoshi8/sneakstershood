import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./profile.scss";
import { signoutUser } from "../../features/authSlice";
import { getUserOrder } from "../../features/orderSlice";
import MyOrderContainer from "../../components/myordercontainer/myorder.component";

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
  // State to hold form input values
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const tokendata = jwtDecode(token);
  const order = useSelector((state) => state.order);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getUserOrder(tokendata.id));
  }, [auth, dispatch]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const signOutHandler = async () => {
    dispatch(signoutUser());
    navigate("/sign-in");
  };
  return (
    <div className="profile-container">
      {/* <h2>Profile</h2> */}
      <div className="profile-details">
        <div className="profile-hero-section">
          <img
            src={`https://robohash.org/${tokendata.name}4?set=set5&size=250x250`}
          />
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
          <Tab label="My Personal Info" {...a11yProps(0)} />
          <Tab label="My Orders" {...a11yProps(1)} />
          <Tab label="My Address" {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <div>
            <div className="my-personalinfo-section">
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
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MyOrderContainer orderDetails={order.orderDetails} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </div>
      {/* <button className="sign-out-button" onClick={signOutHandler}>
        Sign Out
      </button> */}
      {/* <Link to="/" className="back-link">
        Back to Home
      </Link> */}
    </div>
  );
};

export default Profile;
