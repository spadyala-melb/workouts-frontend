import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-container">
          <h2>Login Form</h2>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button className="btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>

          {error &&
            error.map((err) => (
              <div className="error" key={err.message}>
                {err.message}
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Login;
