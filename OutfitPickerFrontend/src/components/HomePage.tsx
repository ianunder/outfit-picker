import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      Welcome user
      <button onClick={handleLogout} className="btn btn-link">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
