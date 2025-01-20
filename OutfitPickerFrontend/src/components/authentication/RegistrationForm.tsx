import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    uname: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/users/register", formData);
      if (response.status === 201) {
        navigate("/home");
      } else {
        const errorText = await response.statusText;
        setError(errorText);
      }
    } catch (err) {
      setError("An error has occured");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="border rounded shadow p-4 bg-white"
        style={{ width: "400px" }}
      >
        <div className="text-center text-muted">
          <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-center mb-4">Register New User</h2>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="uname"
                className="form-control"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
