import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/authenticaton/formInput.component";
import { UserContext } from "../../contexts/user.context";
import "./signIn.scss";
import { signupUser } from "../../features/authSlice";
import { signupSeller } from "../../features/authSellerSlice";

const SignUpSeller = () => {
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

  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [pancardnumber, setPanCardNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [logoimg, setLogoimg] = useState(null);
  const [previewURL, setPreviewURL] = useState(
    "https://vignette.wikia.nocookie.net/tumblr-survivor-athena/images/7/7a/Blank_Avatar.png/revision/latest/scale-to-width-down/477?cb=20161204161729"
  );
  // const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authseller = useSelector((state) => state.authseller);
  console.log(authseller);
  //   console.log(auth);

  useEffect(() => {
    if (authseller._id) {
      navigate("/seller");
    }
  }, [authseller, navigate]);

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
  //   const handleSubmit = async (e) => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //console.log("inner name", name);

    formData.append("businessName", businessName);
    formData.append("businessEmail", businessEmail);
    formData.append("pancardnumber", pancardnumber);
    formData.append("businessType", businessType);
    formData.append("phonenumber", phonenumber);
    formData.append("businessAddress", businessAddress);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("logoimg", logoimg);

    // for (let pair of formData.entries()) {
    //   console.log(`actulformdata:${pair[0]}: ${pair[1]}`);
    // }
    dispatch(signupSeller(formData));
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
      <h2>Sign Up As Seller</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="profile-img-container">
          <div className="c1">
            <img src={previewURL} alt="Profile Preview" width="250" />
          </div>
          <div className="c2">
            <label>Upload Your Business Logo: </label>
            <input
              type="file"
              accept="image/*"
              id="logoimg"
              name="logoimg"
              required
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setLogoimg(selectedFile);
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
              label="Business Name"
              placeHolder="Enter Your's Busines Name Here.."
              type="text"
              id="businessName"
              name="businessName"
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
            <FormInput
              label="PAN Card Number"
              type="number"
              id="pancardnumber"
              name="pancardnumber"
              placeHolder="Enter Your PAN Card Number Here.."
              onChange={(e) => setPanCardNumber(e.target.value)}
              required
            />
            <FormInput
              label="Phone Number"
              type="number"
              id="phonenumber"
              name="phonenumber"
              placeHolder="Enter Your Phone Number Here.."
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              placeHolder="Enter Your Password Here.."
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="right-column">
            <FormInput
              label="Business Email"
              type="email"
              id="businessEmail"
              name="businessEmail"
              placeHolder="Enter Your Business Email Here.."
              onChange={(e) => setBusinessEmail(e.target.value)}
              required
            />
            <div className="select-group">
              <label className="l1">Business Type:</label>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "49%", minHeight: 60 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Select Business Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  label=" Select Business Type"
                  sx={{
                    backgroundColor: "white",
                    fontSize: "20px",
                    paddingLeft: "10px",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"wholesale"}>Wholesale</MenuItem>
                  <MenuItem value={"reatail"}>Retail</MenuItem>
                  <MenuItem value={"individual"}>Individual</MenuItem>
                </Select>
              </FormControl>
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
              <label>Business Address:</label>
              <textarea
                id="businessAddress"
                name="businessAddress"
                placeHolder="Enter Your Business Address Here.."
                onChange={(e) => setBusinessAddress(e.target.value)}
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
              placeHolder="Re-Enter Your Password Here.."
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="button-warning-container">
          <div>
            {authseller.signupStatus === "rejected" ? (
              <p>Warning: {authseller.signupError.message}</p>
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

export default SignUpSeller;
