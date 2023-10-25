import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import "./profile.scss";
import { signoutUser } from "../../features/authSlice";

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
  const signOutHandler = async () => {
    dispatch(signoutUser());
    navigate("/sign-in");
  };
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p>
          <img
            src={`https://robohash.org/${tokendata.name}4?set=set5&size=250x250`}
          />
        </p>
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
      <button className="sign-out-button" onClick={signOutHandler}>
        Sign Out
      </button>
      {/* <Link to="/" className="back-link">
        Back to Home
      </Link> */}
    </div>
    // <div className="profile">
    //   <h2>Profile</h2>
    //   <b>Name: </b> <span>{currentUser.name}</span>
    //   <br />
    //   <b>Eamil: </b> <span>{currentUser.email}</span>
    //   <br />
    //   <b>Token: </b> <span>{currentUser.token}</span>
    // </div>
  );
};

export default Profile;
