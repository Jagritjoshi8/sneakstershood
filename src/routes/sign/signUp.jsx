import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signIn.scss";

const SignUp = () => {
  // State to hold form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Replace this with your registration logic
  //   console.log("Name:", name);
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   console.log("Confirm Password:", confirmPassword);
  //   // You can send a request to your backend for user registration here
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8000/users/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password, passwordConfirm }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    //console.log(result.token);
    if (result.status === "success") {
      alert("Data saved succesfully");
      setEmail("");
      setName("");
      setPassword("");
      setPasswordConfirm("");
    } else {
      alert(`Warning: ${result.message}`);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <h2>OR</h2>

      <p>Already have an account? </p>
      <Link to="/sign-in">
        <b>SIGN IN</b>
      </Link>
    </div>
  );
};

export default SignUp;
