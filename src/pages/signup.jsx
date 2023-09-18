import styles from "../css/userAuth.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    // Create an object with the user data
    const userData = {
      username: username,
      email: email,
      password: password,
    };

    // Send a POST request to your server
    axios
      .post("http://localhost:5000/users", userData)
      .then((response) => {
        console.log("User signed up successfully");
        // Optionally, you can redirect the user to another page after successful signup.
        window.location.replace('/successpage');
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        // Handle the error or show an error message to the user
      });
  };
  return (
    <form className={styles.formContainer} onSubmit={handleSignUp}>
      <div>Sign up</div>
      <div>
        <label htmlFor="">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">E-mail</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
};
export default SignUp;
