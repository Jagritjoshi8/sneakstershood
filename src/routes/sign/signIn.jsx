import React, { useState } from "react";
import "./signIn.scss";

const SignIn = () => {
  // State to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8000/users/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    //console.log(result.token);
    if (result.status === "success") {
      alert("SignIn Successfull");
      setEmail("");
      setPassword("");
    } else {
      alert(`Warning: ${result.message}`);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

// import { useState, useEffect } from "react";
// import "./signIn.scss";

// const SignIn = () => {
//   return (
//     <div>
//       <h2>Sign-IN Form</h2>
//     </div>
//   );
// };

// export default SignIn;
