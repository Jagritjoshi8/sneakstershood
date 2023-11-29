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

  //   const onLogin = (e) => {
  //     e.preventDefault();
  //     console.log(username, secret);
  //     axios
  //       .post("http://localhost:3001/login", { username, secret })
  //       .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
  //       .catch((e) => setLoginError("Username Or Secret Invalid"));
  //   };
  const navigate = useNavigate();
  const onSignup = (e) => {
    e.preventDefault();
    console.log(username, secret, email);
    axios
      .post("http://localhost:3001/signup", {
        username,
        email,
        first_name,
        last_name,
        secret,
        confirmSecret,
      })
      .then(
        (r) => props.onAuth({ ...r.data, secret }),
        navigate("/seller/channel")
      ) // NOTE: over-ride secret
      .catch((e) => setSignUpError("invalid inputs"));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    props.onAuth({ username: value, secret: value });
  };
  return (
    <div
      className="channel-backgrounds"
      data-aos="fade-zoom-in"
      data-aos-duration="2000"
    >
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
          {/* <div className="auth-label">Username</div> */}
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
          {/* <div className="auth-label2">Secret</div> */}
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
          {/* {signUpError ? <p>{signUpError}</p> : null} */}
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
    // <div className="login-page">
    //   <div className="card">
    //     {/* Login Form */}
    //     <form onSubmit={onLogin}>
    //       <div className="title">Login</div>
    //       <input
    //         type="text"
    //         name="username"
    //         placeholder="Username"
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         name="secret"
    //         placeholder="Password"
    //         onChange={(e) => setSecret(e.target.value)}
    //       />
    //       <button type="submit">LOG IN</button>
    //     </form>

    //     {/* Sign Up Form */}
    //     <form onSubmit={onSignup}>
    //       <div className="title">or Sign Up</div>
    //       <input
    //         type="text"
    //         name="username"
    //         placeholder="Username"
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         name="secret"
    //         placeholder="Password"
    //         onChange={(e) => setSecret(e.target.value)}
    //       />
    //       <input
    //         type="text"
    //         name="email"
    //         placeholder="Email"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <input
    //         type="text"
    //         name="first_name"
    //         placeholder="First name"
    //         onChange={(e) => setFirstName(e.target.value)}
    //       />
    //       <input
    //         type="text"
    //         name="last_name"
    //         placeholder="Last name"
    //         onChange={(e) => setLastName(e.target.value)}
    //       />
    //       <button type="submit">SIGN UP</button>
    //     </form>
    //   </div>

    //   <style>{`
    //   .login-page { width: 100vw; height: 100vh; padding-top: 6vw; background: linear-gradient(180deg, rgba(117,84,160,1) 7%, rgba(117,84,160,1) 17%, rgba(106,95,168,1) 29%, rgba(99,103,174,1) 44%, rgba(87,116,184,1) 66%, rgba(70,135,198,1) 83%, rgba(44,163,219,1) 96%, rgba(22,188,237,1) 100%, rgba(0,212,255,1) 100%); }
    //   .card { width: 200px; position: relative; left: calc(50vw - 100px); text-align: center; }
    //   .title { padding-top: 32px; font-size: 22px; color: white; font-weight: 700; }
    //   input { width: calc(100% - 16px); margin-top: 12px; padding: 8px; background-color: #e6f7ff; outline: none; border: 1px solid #e6f7ff; }
    //   button { margin-top: 12px; width: 100%; padding: 8px; }
    //   `}</style>
    // </div>
  );
};

export default ChannelSignupContainer;
