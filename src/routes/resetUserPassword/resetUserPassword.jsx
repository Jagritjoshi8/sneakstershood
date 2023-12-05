import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import jwtDecode from "jwt-decode";
import FormInput from "../../components/authenticaton/userformInput.component";
import "./resetUserPassword.scss";
import { resetPassword } from "../../features/authSlice";

const ResetUserPassword = () => {
  const [tokenError, setTokenError] = useState(null);
  const [tokenData, setTokenData] = useState([]);
  const { resettoken } = useParams();
  console.log(resettoken);
  useEffect(() => {
    try {
      const tokendata = jwtDecode(resettoken);
      console.log(tokendata);
      setTokenData(tokendata);
      console.log(tokenData);
    } catch (error) {
      console.error("Invalid token:", error);
      setTokenError("Token is not valid or may be Expired");
    }
  }, []);
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.rpStatus === "success") {
      navigate("/sign-in");
    }
  }, [auth, navigate]);

  const [newpassword, setNewPassword] = useState("");
  const [confirmnewpassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        userId: tokenData.id,
        resetData: { resettoken, newpassword, confirmnewpassword },
      })
    );
  };
  return (
    <div className="reset-password-page">
      <video
        src="/assets/video/signinbgvideo.mp4"
        type="video/mp4"
        autoPlay
        muted
        loop
      ></video>
      <div className="reset-password-card">
        {tokenError ? (
          <div>{tokenError}</div>
        ) : (
          <div
            data-aos="fade-in"
            data-aos-duration="2500"
            data-aos-easing="linear"
          >
            <div className="reset-password-header">
              <h2>Hi! {tokenData.name}</h2>
              <h3>Reset Your Password For Sneakers Hood:</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="left-column ">
                <FormInput
                  label="New Password"
                  title="*should contain atleast 1 capital Letter,1 digt,1 special character and min length of 5"
                  type="password"
                  id="password"
                  name="password"
                  value={newpassword}
                  placeholder="Enter Your New Password Here.."
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <FormInput
                  label=" Confirm New Password"
                  title="*should contain atleast 1 capital Letter,1 digit,1 special character and min length of 5"
                  type="password"
                  id="confirmpassword"
                  name="password"
                  value={confirmnewpassword}
                  placeholder="Re-Enter Your New Password Here.."
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <div className="button-warning-containers">
                  <div className="warning-container">
                    {auth.rpStatus === "rejected" ? (
                      <p> {auth.rpError.message}</p>
                    ) : null}
                  </div>
                  <button type="submit">Reset Password</button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetUserPassword;
