import React, { useState } from "react";
import loginImage from "../../assets/images/login.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/authService";
import "./auth.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = e => {
    e.preventDefault();

    AuthService.login({ email, password }).then(res => console.log(res));
    // axios
    //   .post("/login", { email, password })
    //   .then(res => {
    //     console.log("res", res);
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });

    console.log(email, password);
  };
  return (
    <div id="auth-container">
      <div className="auth-card">
        <div className="card-shadow">
          <div className="image-section">
            <img src={loginImage} alt="Login" />
          </div>

          <div className="form-section">
            <h2>Welcome Back!</h2>
            <form onSubmit={submitForm}>
              <div className="input-field mb-1">
                <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                />
              </div>

              <div className="input-field mb-2">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button>Login</button>
            </form>

            <p>
              Don't have an account? <Link to="/register">Register.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
