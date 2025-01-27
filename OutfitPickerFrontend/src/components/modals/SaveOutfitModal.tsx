import React, { useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useAuth } from "../authentication/AuthProvider";
import { ClothingItem } from "../../models/ClothingItem";

interface SaveOutfitModalProps {
  show: boolean;
  onClose: () => void;
  selectedHat: ClothingItem | null;
  selectedTop: ClothingItem | null;
  selectedBottom: ClothingItem | null;
  selectedShoes: ClothingItem | null;
  onSaveSuccess: () => void;
}

const SaveOutfitModal: React.FC<SaveOutfitModalProps> = ({ 
  show, onClose, selectedHat, selectedTop, selectedBottom, selectedShoes, onSaveSuccess}) => {
  const { user } = useAuth();
  const [outfitName, setOutfitName] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    if (!user) return;

    const formData = new FormData();
    formData.append("uid", user.id.toString());
    formData.append("name", outfitName);
    formData.append("description", description);
    if (selectedHat) formData.append("hatId", selectedHat.id.toString());
    if (selectedTop) formData.append("topId", selectedTop.id.toString());
    if (selectedBottom) formData.append("bottomId", selectedBottom.id.toString());
    if (selectedShoes) formData.append("shoesId", selectedShoes.id.toString());
   
  
    try {
      const response = await axiosInstance.post("/outfits/create", formData);
      console.log("Upload successful", response.data);
      onSaveSuccess();
    } catch (error) {
      console.error("Error uploading outfit", error);
    }
  };

  if (!show) return null;

  return (
    <>
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Save New Outfit</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Outfit Name</label>
              <input
                type="text"
                className="form-control"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
              />
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
          </div>
          <div className="modal-footer d-flex justify-content-between w-100">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleUpload}>
              Save Outfit
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SaveOutfitModal;