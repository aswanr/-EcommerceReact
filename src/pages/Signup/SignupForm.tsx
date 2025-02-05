import React, { useState } from "react";
import axios from "axios";
import "../../styles/Signup.css";

// import { useNavigate } from "react-router-dom";

function SignUp() {
  // const navigate = useNavigate();
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [signupError, setSignupError] = useState("");
  const [created_time] = useState(new Date());

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axios
        .post("http://localhost:3001/user/postuser", {
          first_name,
          last_name,
          username,
          password,
          email,
          phone_number,
          created_time,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Gotted the data")
            // navigate('/Login');
          }
        })
        .catch((error) => {
          console.log(error);
          setSignupError("Unable to find");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={handleSubmission} className="signup-form">
          <h3 className="form-title">Create an Account</h3>

          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" className="input-field" onChange={(e) => setFirstname(e.target.value)} placeholder="Enter first name" required />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" className="input-field" onChange={(e) => setLastname(e.target.value)} placeholder="Enter last name" />
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="input-field" onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="input-field" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input-field" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" className="input-field" onChange={(e) => setPhonenumber(e.target.value)} placeholder="Enter phone number" required />
          </div>

          <button className="submit-btn">Sign Up</button>
          {/* <button onClick={() => {navigate('/')}} >Login</button> */}
          {signupError && <p className="error-text">{signupError}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
