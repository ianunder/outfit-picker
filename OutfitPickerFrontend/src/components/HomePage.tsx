import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";

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
      <UserList></UserList>
      <button onClick={handleLogout} className="btn btn-link">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
