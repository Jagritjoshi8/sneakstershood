import { useState } from "react";
import axios from "axios";
import "./channelAuth.styles.scss";
import { Link } from "react-router-dom";

const ChannelAuthContainer = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [loginError, setLoginError] = useState();

  const onLogin = (e) => {
    e.preventDefault();
    console.log(username, secret);
    axios
      .post("http://localhost:8000/channel/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => setLoginError("UserName Or Secrect is Invalid"));
  };

  return (
    <div className="channel-backgrounds">
      <form
        onSubmit={onLogin}
        className="form-card"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Enter your username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input
            className="auth-input"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="auth-label2">Secret</div>
          <input
            className="auth-input"
            name="secret"
            onChange={(e) => setSecret(e.target.value)}
          />
          {loginError ? <p>{loginError}</p> : null}
          <button className="auth-button" type="submit">
            Enter
          </button>
          <div className="signup-contianer">
            <p>OR</p>

            <Link to="channel-signup">
              <p className="signuplink">Create New Chat Account? Signup</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChannelAuthContainer;
