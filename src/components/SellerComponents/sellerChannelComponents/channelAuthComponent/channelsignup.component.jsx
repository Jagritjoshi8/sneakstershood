import { useState } from "react";
import axios from "axios";
import "./channelAuth.styles.scss";
import { useNavigate } from "react-router";

const ChannelSignupContainer = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [confirmSecret, setConfirmSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [signUpError, setSignUpError] = useState();

  const navigate = useNavigate();
  const onSignup = (e) => {
    e.preventDefault();
    console.log(username, secret, email);
    axios
      .post("http://localhost:8000/channel/signup", {
        username,
        email,
        first_name,
        last_name,
        secret,
        confirmSecret,
      })
      .then((r) => {
        if (!r.data.error) {
          navigate("/seller/channel");
          //   props.onAuth({ ...r.data, secret });
        }
      })
      .catch((e) => setSignUpError(e.response.data));
  };

  return (
    <div className="seller-channel-background">
      <div className="channel-backgrounds">
        <form
          onSubmit={onSignup}
          className="form-card"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <div className="form-title">Welcome 👋</div>
          <div className="form-subtitle">
            Enter all below details to get started
          </div>

          <div className="auth">
            <input
              className="auth-input"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your UserName Here..."
            />
            <input
              className="auth-input"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Here..."
            />
            <input
              className="auth-input"
              name="first_name"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter Your First Name Here..."
            />
            <input
              className="auth-input"
              name="last_name"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Your Last Name Here..."
            />

            <input
              className="auth-input"
              name="secret"
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter Your Secret  Here..."
            />
            <input
              className="auth-input"
              name="confirmsecret"
              onChange={(e) => setConfirmSecret(e.target.value)}
              placeholder="Re-Enter Your Secret  Here..."
            />
            {signUpError ? <p>{signUpError?.message}</p> : null}
            <button className="auth-button" type="submit">
              Enter
            </button>
            {/* <div>
            <p>OR</p>
            <p>Signin</p>
          </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChannelSignupContainer;
