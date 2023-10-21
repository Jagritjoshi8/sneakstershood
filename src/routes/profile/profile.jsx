import React, { useState, useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router";
import "./profile.scss";

const Profile = () => {
  // State to hold form input values
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    setCurrentUser(null);
    navigate("/sign-in");
  };
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p>
          <img
            src={`https://robohash.org/${currentUser.name}4?set=set5&size=250x250`}
          />
        </p>
        <p>
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Age:</strong> {currentUser.age}
        </p>
        <p>
          <strong>Gender:</strong> {currentUser.gender}
        </p>
        <p>
          <strong>Phone Number:</strong> {currentUser.phonenumber}
        </p>
        <p>
          <strong>Address:</strong> {currentUser.address}
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
