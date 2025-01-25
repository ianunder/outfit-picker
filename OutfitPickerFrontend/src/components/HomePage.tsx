import React from "react";
import { useAuth } from "./authentication/AuthProvider";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import ImageUpload from "./modals/ClothingUpload";
import ClothingList from "./clothing/ClothingList";
import OutfitPickerUi from "./clothing/OutfitPickerUi"
import ClothingUpload from "./modals/ClothingUpload";
import "./HomePage.css";
import AddClothingButton from "./AddClothingButton";

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
    <AddClothingButton></AddClothingButton>
  
    </>
  );
};

export default HomePage;
