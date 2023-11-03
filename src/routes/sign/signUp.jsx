import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/authenticaton/formInput.component";
import { UserContext } from "../../contexts/user.context";
import "./signIn.scss";
import { signupUser } from "../../features/authSlice";

const SignUp = () => {
  // State to hold form input values
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   age: "",
  //   gender: "",
  //   phonenumber: "",
  //   address: "",
  //   password: "",
  //   passwordConfirm: "",
  //   profileimg: null,
  // });
  // console.log("pimg", user.profileimg);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profileimg, setProfileimg] = useState(null);
  const [previewURL, setPreviewURL] = useState(
    "https://vignette.wikia.nocookie.net/tumblr-survivor-athena/images/7/7a/Blank_Avatar.png/revision/latest/scale-to-width-down/477?cb=20161204161729"
  );
  // const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/profile");
    }
  }, [auth, navigate]);

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Replace this with your registration logic
  //   console.log("Name:", name);
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   console.log("Confirm Password:", confirmPassword);
  //   // You can send a request to your backend for user registration here
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("inner name", name);

    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("phonenumber", phonenumber);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("profileimg", profileimg);

    // for (let pair of formData.entries()) {
    //   console.log(`actulformdata:${pair[0]}: ${pair[1]}`);
    // }
    dispatch(signupUser(formData));
  };
  // let result = await fetch("http://localhost:8000/users/signup", {
  //   method: "post",
  //   body: JSON.stringify({
  //     name,
  //     email,
  //     age,
  //     gender,
  //     phonenumber,
  //     address,
  //     password,
  //     passwordConfirm,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // result = await result.json();
  // console.warn(result);
  // //console.log(result.token);
  // if (result.status === "success") {
  //   alert("Data saved succesfully");
  //   setEmail("");
  //   setName("");
  //   setPassword("");
  //   setPasswordConfirm("");
  //   setCurrentUser(result);
  //   navigate("/profile");
  // } else {
  //   alert(`Warning: ${result.message}`);
  // }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="profile-img-container">
          <div className="c1">
            <img src={previewURL} alt="Profile Preview" width="250" />
          </div>
          <div className="c2">
            <label>Upload Your Profile Picture: </label>
            <input
              type="file"
              accept="image/*"
              id="profileimg"
              name="profileimg"
              required
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setProfileimg(selectedFile);
                if (selectedFile) {
                  const imageURL = URL.createObjectURL(selectedFile);
                  setPreviewURL(imageURL);
                }
              }}
            />
          </div>
        </div>
        <div className="form-inner-container">
          <div className="left-column">
            <FormInput
              label="Name"
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <FormInput
              label="Age"
              type="age"
              id="age"
              name="age"
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <FormInput
              label="Phone Number"
              type="phonenumber"
              id="phonenumber"
              name="phonenumber"
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />

            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="right-column">
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* <FormInput
              label="Gender"
              type="gender"
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            /> */}

            <div className="form-group">
              <label>Address:</label>
              <textarea
                id="address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                required
                rows="2"
                cols="22"
              ></textarea>
            </div>
            {/* <FormInput
              label="Address"
              type="address"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            /> */}
            <FormInput
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="button-warning-container">
          <div>
            {auth.signupStatus === "rejected" ? (
              <p>Warning: {auth.signupError.message}</p>
            ) : null}
          </div>
          <button type="submit">Sign Up</button>
        </div>
      </form>

      <h2>OR</h2>

      <h3>Already have an account? </h3>
      <Link to="/sign-in">
        <h3 className="sign-other-button">SIGN IN</h3>
      </Link>
    </div>
  );
};

export default SignUp;
