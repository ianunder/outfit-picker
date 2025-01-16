import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  // State for form inputs
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useNavigate();

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
    // Add your login logic here

    try {
      const response = await api.post("/users/auth", {
        uname: username,
        password: password,
      });
      if (response.status === 200) {
        login("/home");
      }
    } catch (error) {
      console.error("Login failed.", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="border rounded shadow p-4 bg-white"
        style={{ width: "400px" }}
      >
        {/* Placeholder content */}
        <p className="text-center text-muted">
          <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-center mb-4">Login</h2>

            {/* Username field */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="uname"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
