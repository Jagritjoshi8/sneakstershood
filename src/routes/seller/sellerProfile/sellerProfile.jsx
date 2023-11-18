import React from "react";
import "./sellerProfile.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { signoutSeller } from "../../../features/authSellerSlice";

const SellerProfile = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const authseller = useSelector((state) => state.authseller);
  console.log(authseller);
  const sellertoken = authseller.sellertoken;
  const tokendata = jwtDecode(sellertoken);
  let imageURL;
  if (authseller.logoimg) {
    imageURL = `http://localhost:8000/${authseller.logoimg}`;
  } else {
    imageURL = `https://png.pngtree.com/png-clipart/20210912/original/pngtree-your-logo-poster-png-image_6728130.jpg`;
  }
  const signOutHandler = async () => {
    dispatch(signoutSeller());
    navigate("/");
  };
  return (
    <div>
      <div className="seller-profile-section">
        <div className="seller-profile-header">
          <div className="logo-container">
            <img src={imageURL} alt="Profile Preview" width="250" />
          </div>
          <div className="seller-profile-id">
            <p>
              <strong>Seller ID:</strong> {authseller._id}
            </p>
            <button className="sign-out-button" onClick={signOutHandler}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="seller-profile-details">
          <div className="left-details">
            <p>
              <strong>Business Name:</strong> {tokendata.businessName}
            </p>
            <p>
              <strong>Business Address:</strong> {tokendata.businessAddress}
            </p>
            <p>
              <strong>Business Type:</strong> {tokendata.businessType}
            </p>
          </div>
          <div className="right-details">
            <p>
              <strong>Business Email:</strong> {tokendata.businessEmail}
            </p>
            <p>
              <strong>PAN Card Number:</strong> {tokendata.pancardnumber}
            </p>
            <p>
              <strong>Contact Number:</strong> {tokendata.phonenumber}
            </p>
          </div>
        </div>
        <div className="profile-hero-details">
          {/* <button className="sign-out-button" onClick={signOutHandler}>
            Sign Out
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
