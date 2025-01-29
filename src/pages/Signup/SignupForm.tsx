import React, { useState } from "react";
import axios from "axios";
import "../../styles/Signup.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [first_name, setfirstname] = useState("");
  const [last_name, setlastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [phone_number, setphonenumber] = useState("");
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
            navigate("/login");
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
    <div className="main-condainer">
      <h1>Signup</h1>
      <div className="second-condainer">
        <form onSubmit={handleSubmission} className="form-condainer">
          <label htmlFor="firstname">firstname</label>
          <input
            type="text"
            onChange={(e) => setfirstname(e.target.value)}
            placeholder="firstname"
            required
          />
          <br></br>
          <label htmlFor="firstname">Lastname</label>
          <input
            type="text"
            onChange={(e) => setlastname(e.target.value)}
            placeholder="lastname"
          />
          <br></br>
          <label htmlFor="firstname">Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <br></br>
          <label htmlFor="firstname">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <br></br>
          <label htmlFor="firstname">Email</label>
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="email"
            required
          />
          <br></br>
          <label htmlFor="firstname">Phonenumber</label>
          <input
            type="number"
            onChange={(e) => setphonenumber(e.target.value)}
            placeholder="phonenumber"
            required
          />
          <br></br>
          <button type="submit">Signup</button>
        </form>
        {signupError && <div className="error-message">{signupError}</div>}
      </div>
    </div>
  );
}

export default SignUp;
