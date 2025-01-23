import React from "react";
import { useAuth } from "./authentication/AuthProvider";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import ImageUpload from "./clothing/ClothingUpload";
import ClothingList from "./clothing/ClothingList";
import OutfitPickerUi from "./clothing/OutfitPickerUi"
import ClothingUpload from "./clothing/ClothingUpload";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
    <OutfitPickerUi/>
  
    </>
  );
};

export default HomePage;
