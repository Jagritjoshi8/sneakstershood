import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import FormInput from "../../components/authenticaton/formInput.component";
import { UserContext } from "../../contexts/user.context";
import "./signIn.scss";

const SignIn = () => {
  // State to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8000/users/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    //console.log(result.token);
    if (result.status === "success") {
      alert("SignIn Successfull");
      setEmail("");
      setPassword("");
      setCurrentUser(result);
      navigate("/profile");
    } else {
      alert(`Warning: ${result.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="form-inner-container">
        <div className="left-column">
          <FormInput
            label="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
