import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/authenticaton/formInput.component";
import { UserContext } from "../../contexts/user.context";
import "./signIn.scss";

const SignUp = () => {
  // State to hold form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
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
    let result = await fetch("http://localhost:8000/users/signup", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        age,
        gender,
        phonenumber,
        address,
        password,
        passwordConfirm,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    //console.log(result.token);
    if (result.status === "success") {
      alert("Data saved succesfully");
      setEmail("");
      setName("");
      setPassword("");
      setPasswordConfirm("");
      setCurrentUser(result);
      navigate("/profile");
    } else {
      alert(`Warning: ${result.message}`);
    }
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <FormInput
              label="Age"
              type="age"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <FormInput
              label="Phone Number"
              type="phonenumber"
              id="phonenumber"
              name="phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />

            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              value={password}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={gender}
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
                value={address}
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
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
        </div>
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
