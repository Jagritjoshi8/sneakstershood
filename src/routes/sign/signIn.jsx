import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/authenticaton/formInput.component";
import "./signIn.scss";
import { signinUser } from "../../features/authSlice";

const SignIn = () => {
  // State to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { setCurrentUser } = useContext(UserContext);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/profile");
    }
  }, [auth, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
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
        {auth.signinStatus === "rejected" ? (
          <p>Warning: {auth.signinError.message}</p>
        ) : null}

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
