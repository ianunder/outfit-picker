import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../api/axiosConfig";
import { useAuth } from "../authentication/AuthProvider";

const ImageUpload = () => {
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("uname", user && user.name ? user.name : "User unknown");
      formData.append("userID", user && user.id ? user.id : "User unknown");
      formData.append("clothingName", "nametest");
      formData.append("description", "descriptiontest");
      formData.append("clothingType", "BOTTOM");

      const response = await axiosInstance.post("/clothing/upload", formData);

      const result = await response.data;
      setMessage(result);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      <p>{message}</p>
    </div>
  );
};

export default ImageUpload;
