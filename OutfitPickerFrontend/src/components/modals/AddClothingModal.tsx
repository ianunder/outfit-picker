import React, { Dispatch, SetStateAction, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useAuth } from "../authentication/AuthProvider";

interface AddClothingModalProps {
  show: boolean;
  onClose: () => void;
  handleClothingAdded: () => void;
}

const AddClothingModal: React.FC<AddClothingModalProps> = ({ show, onClose, handleClothingAdded }) => {
  const { user } = useAuth();
  const [clothingName, setClothingName] = useState("");
  const [clothingType, setClothingType] = useState("TOP");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image || !user) return;

    onClose();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("uname", user.name);
    formData.append("userID", user.id.toString());
    formData.append("clothingName", clothingName);
    formData.append("description", description);
    formData.append("clothingType", clothingType);

    try {
      const response = await axiosInstance.post("/clothing/upload", formData);
      console.log("Upload successful", response.data);
      handleClothingAdded();
    } catch (error) {
      console.error("Error uploading clothing", error);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block custom-modal-backdrop"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Clothing Item</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Clothing Name</label>
              <input
                type="text"
                className="form-control"
                value={clothingName}
                onChange={(e) => setClothingName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Clothing Type</label>
              <select
                className="form-select"
                value={clothingType}
                onChange={(e) => setClothingType(e.target.value)}
              >
                <option value="TOP">Top</option>
                <option value="BOTTOM">Bottom</option>
                <option value="SHOES">Shoes</option>
                <option value="HAT">Hat</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between w-100">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleUpload}>
              Add Clothing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClothingModal;