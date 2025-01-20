import React from "react";
import { useAuth } from "./authentication/AuthProvider";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import ImageUpload from "./ImageUpload";

const HomePage: React.FC = () => {
  const { logout , user} = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      Welcome {user ? user.name : null}
      <ImageUpload></ImageUpload>
      <button onClick={handleLogout} className="btn btn-link">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
