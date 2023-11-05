import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/authenticaton/formInput.component";
import "./signIn.scss";
import { signinUser } from "../../features/authSlice";
import { Link } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <div className="form-inner-container">
          <div className="sketchfab-embed-wrapper threeD-sneaker-container">
            {" "}
            <iframe
              height="500"
              width="750"
              title="Sneakers"
              frameborder="0"
              allowfullscreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              src="https://sketchfab.com/models/50725ef7d75d4898be0640700cd31c8d/embed?autospin=1&autostart=1&transparent=1&ui_hint=0"
            >
              {" "}
            </iframe>{" "}
          </div>
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
            <div className="button-warning-container">
              <div>
                {auth.signinStatus === "rejected" ? (
                  <p>Warning: {auth.signinError.message}</p>
                ) : null}
              </div>

              <button type="submit">Sign In</button>
              <h2>OR</h2>

              <h3>Create New Account? </h3>
              <Link to="/sign-up">
                <h3 className="sign-other-button">SIGN UP</h3>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
