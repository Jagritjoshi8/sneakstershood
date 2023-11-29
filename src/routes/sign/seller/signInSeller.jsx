import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../../components/authenticaton/formInput.component";
import "./signSeller.scss";
import { signinUser } from "../../../features/authSlice";
import { Link } from "react-router-dom";
import { signinSeller } from "../../../features/authSellerSlice";

const SignInSeller = () => {
  // State to hold form input values
  const [businessEmail, setBusinessEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { setCurrentUser } = useContext(UserContext);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const authseller = useSelector((state) => state.authseller);
  console.log(authseller);
  //   console.log(auth);

  useEffect(() => {
    if (authseller._id) {
      navigate("/seller/summary");
    }
  }, [authseller, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinSeller({ businessEmail, password }));
  };

  return (
    <div className="containers">
      <h2 data-aos="fade-up" data-aos-duration="2000" data-aos-easing="linear">
        Sign In As Seller
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-inner-container">
          <div class="sketchfab-embed-wrapper threeD-sneaker-container">
            {" "}
            <iframe
              height="770"
              width="900"
              title="Robot Playground"
              frameborder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              src="https://sketchfab.com/models/59fc99d8dcb146f3a6c16dbbcc4680da/embed?autostart=1&ui_hint=0"
            >
              {" "}
            </iframe>{" "}
          </div>

          <div
            className="left-column"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-easing="linear"
          >
            <FormInput
              label="Business Email"
              type="email"
              id="email"
              name="busiinessEmail"
              value={businessEmail}
              placeHolder="Enter Your Business Email Here.."
              onChange={(e) => setBusinessEmail(e.target.value)}
              required
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              placeHolder="Enter Your Password Here.."
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="button-warning-container">
              <div>
                {authseller.signinStatus === "rejected" ? (
                  <p>Warning: {authseller.signinError.message}</p>
                ) : null}
              </div>

              <button type="submit">Sign In</button>
              <h2>OR</h2>

              <h3>Create New Account? </h3>
              <Link to="/sign-up-seller">
                <h3 className="sign-other-button">SIGN UP AS SELLER</h3>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInSeller;
