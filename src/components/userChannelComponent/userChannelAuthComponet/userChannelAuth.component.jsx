import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./userChannelAuth.styles.scss";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserChannelAuthContainer = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!auth._id) {
      setOpen(true);
    }
  }, [auth]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post("http://localhost:8000/channel/authenticate", { username: value })
      .then((r) => props.onAuth({ ...r.data, secret: value }))
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (
    <div className="channel-background">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="first-signin-modal">
          <DialogTitle>{"Doesn't SignIn Yet?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              SignIn first to enjoy smooth experience of sneakers hood app,
              facilities like Placing Order, Chat With others,etc will unlock
              after Sign In.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={() => navigate("/sign-in")}>SignIn</button>
          </DialogActions>
        </div>
      </Dialog>
      <form
        onSubmit={onSubmit}
        className="form-card"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Set your username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />

          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserChannelAuthContainer;
