import React, { useState } from "react";
import axios from "axios";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login/user", { username, password })
      .then((res) => {
        if (res.status === 200) {
          setLoginError("User Founded");
          console.log("Login successful");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError("Unable to find");
      });
  }

  return (
    <div className="Main-condainer">
      <h1>Login</h1>
      <div className="condainer-1">
        <form onSubmit={handleSubmission} className="form-condainer">
          <label htmlFor="username">USERNAME:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label htmlFor="username">PASSWORD:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          {loginError && <h1>{loginError}</h1>}
          <a onClick={() => navigate("/SignUp")}>SignUp</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
