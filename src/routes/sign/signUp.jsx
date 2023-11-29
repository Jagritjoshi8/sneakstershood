import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/authenticaton/userformInput.component";
import { UserContext } from "../../contexts/user.context";
import "./signIn.scss";
import { signupUser } from "../../features/authSlice";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(255, 206, 247, 0.76)",
    color: "red",
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));

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
    <div className="user-sign-container">
      <div className="container">
        <div
          className="are-you-seller"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          Are You Seller?{" "}
          <Link to="/sign-up-seller">
            <p className="sign-up-seller-link">Sign Up As Seller</p>
          </Link>
        </div>
        <h2 data-aos="fade-up" data-aos-duration="2000">
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
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
                title="*should be atleast 6 characters long"
                placeHolder="Enter Your Name Here.."
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* <FormInput
              label="Age"
              type="age"
              id="age"
              name="age"
              onChange={(e) => setAge(e.target.value)}
              required
            /> */}
              <div className="select-group">
                <div>
                  <label className="l1">Age:</label>
                </div>
                <div className="input-info-container">
                  <FormControl
                    variant="standard"
                    sx={{
                      m: 1,
                      width: "86%",
                      minHeight: 60,
                      marginLeft: "15px",
                      marginTop: "-10px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Select Age
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      label=" Select Age"
                      sx={{
                        backgroundColor: "rgba(255, 206, 247, 0.76)",
                        fontSize: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={15}>15-19</MenuItem>
                      <MenuItem value={20}>20-24</MenuItem>
                      <MenuItem value={25}>25-29</MenuItem>
                      <MenuItem value={30}>30-34</MenuItem>
                      <MenuItem value={35}>35-39</MenuItem>{" "}
                      <MenuItem value={40}>40+</MenuItem>
                    </Select>
                  </FormControl>
                  <LightTooltip
                    title="*should be from given age numbers"
                    arrow
                    placement="top-start"
                  >
                    <InfoOutlinedIcon className="info-icon" />
                  </LightTooltip>
                </div>
              </div>

              <FormInput
                label="Phone Number"
                title="*should be 10 digit valid indian number"
                type="phonenumber"
                id="phonenumber"
                name="phonenumber"
                placeHolder="Enter Your Phone Number Here.."
                onChange={(e) => setPhonenumber(e.target.value)}
                required
              />

              <FormInput
                label="Password"
                title="*should contain at least 1 capital letter, 1 digit, 1 special character & min length of 5"
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
                label="Email"
                title="*should be valid email including @,.com"
                type="email"
                id="email"
                name="email"
                placeHolder="Enter Your Email Here.."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="select-group">
                <label className="l1">Gender:</label>

                <div className="input-info-container">
                  <FormControl
                    variant="standard"
                    sx={{
                      m: 1,
                      width: "87%",
                      minHeight: 60,
                      marginLeft: "15px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Select Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      label=" Select Gender"
                      sx={{
                        backgroundColor: "rgba(255, 206, 247, 0.76)",
                        fontSize: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                      <MenuItem value={"others"}>Others</MenuItem>
                    </Select>
                  </FormControl>
                  <LightTooltip
                    title="*should be from male,female,others"
                    arrow
                    placement="top-start"
                  >
                    <InfoOutlinedIcon className="info-icon" />
                  </LightTooltip>
                </div>
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

                <div className="input-info-container">
                  <textarea
                    id="address"
                    name="address"
                    placeHolder="Enter Your Address Here.."
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows="2"
                    cols="22"
                  ></textarea>
                  <LightTooltip
                    title="*should be a valid address, atleast 10 char long"
                    arrow
                    placement="top-start"
                  >
                    <InfoOutlinedIcon className="info-icon" />
                  </LightTooltip>
                </div>
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
                title="*should be same to original password"
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
    </div>
  );
};

export default SignUp;
