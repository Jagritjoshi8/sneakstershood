import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/authenticaton/userformInput.component";
import "./signIn.scss";
import { forgotPassword, signinUser } from "../../features/authSlice";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/profile");
    }
  }, [auth, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  return (
    <div className="user-sign-container">
      <video
        src="/assets/video/signinbgvideo.mp4"
        type="video/mp4"
        autoPlay
        muted
        loop
      ></video>
      <div className="container">
        <div className="are-you-seller">
          Are You Seller?{" "}
          <Link to="/sign-in-seller">
            <p className="sign-up-seller-link">Sign In As Seller</p>
          </Link>
        </div>
        <h2
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-easing="linear"
        >
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-inner-container">
            <div class="sketchfab-embed-wrapper threeD-sneaker-container">
              {" "}
              <iframe
                title="Purple Sneakers Basketball Shoes"
                height="500"
                width="750"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/31fa2a898742444fbcf4fcd784dd70a8/embed?autospin=1&autostart=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&dnt=1"
              >
                {" "}
              </iframe>{" "}
            </div>
            <div
              className="left-column blur-bg"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-easing="linear"
            >
              <FormInput
                label="Email"
                title="*should be valid email including @,.com"
                type="email"
                id="email"
                name="email"
                value={email}
                placeHolder="Enter Your Email Here.."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                label="Password"
                title="*should contain atleast 1 capital Letter,1 special character and min length of 5"
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
                  {auth.fpStatus === "rejected" ? (
                    <p>Warning: {auth.fpError.message}</p>
                  ) : auth.fpStatus === "success" ? (
                    <p className="success-warning">{auth.fpMsg}</p>
                  ) : auth.signinStatus === "rejected" ? (
                    <p>Warning: {auth.signinError.message}</p>
                  ) : null}
                </div>
                <button type="submit">Sign In</button>
                <h3 className="user-forgot-password">
                  Forgot Password?{" "}
                  <span
                    onClick={handleForgotPassword}
                    className="forgot-password-link"
                  >
                    click here
                  </span>
                </h3>
                <h2 className="h2or">OR</h2>

                <h3>Create New Account? </h3>
                <Link to="/sign-up">
                  <h3 className="sign-other-button">SIGN UP</h3>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
