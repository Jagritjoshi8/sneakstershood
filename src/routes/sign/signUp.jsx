import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/authenticaton/formInput.component";
import { UserContext } from "../../contexts/user.context";
import "./signIn.scss";
import { signupUser } from "../../features/authSlice";

const SignUp = () => {
  // State to hold form input values
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phonenumber: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [age, setAge] = useState("");
  // const [gender, setGender] = useState("");
  // const [phonenumber, setPhonenumber] = useState("");
  // const [address, setAddress] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");
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
    dispatch(signupUser(user));

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
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-inner-container">
          <div className="left-column">
            <FormInput
              label="Name"
              type="text"
              id="name"
              name="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />

            <FormInput
              label="Age"
              type="age"
              id="age"
              name="age"
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              required
            />

            <FormInput
              label="Phone Number"
              type="phonenumber"
              id="phonenumber"
              name="phonenumber"
              onChange={(e) =>
                setUser({ ...user, phonenumber: e.target.value })
              }
              required
            />

            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div className="right-column">
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                id="gender"
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
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
                onChange={(e) => setUser({ ...user, address: e.target.value })}
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
              onChange={(e) =>
                setUser({ ...user, passwordConfirm: e.target.value })
              }
              required
            />
          </div>
        </div>
        {auth.signupStatus === "rejected" ? (
          <p>Warning: {auth.signupError.message}</p>
        ) : null}
        <button type="submit">Sign Up</button>
      </form>

      <h2>OR</h2>

      <p>Already have an account? </p>
      <Link to="/sign-in">
        <b>SIGN IN</b>
      </Link>
    </div>
  );
};

export default SignUp;
