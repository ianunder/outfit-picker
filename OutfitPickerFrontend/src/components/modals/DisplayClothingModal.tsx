import React, { useState } from "react";
import { ClothingItem } from "../../models/ClothingItem.ts";
import ClothingImage from "../clothing/ClothingImage.tsx";

interface ClothingModalProps {
  selectedItem: ClothingItem | null;
  handleCloseModal: () => void;
  handleDeleteClothing: () => void;
}

const ClothingModal: React.FC<ClothingModalProps> = ({
  selectedItem,
  handleCloseModal,
  handleDeleteClothing,
}) => {
  if (!selectedItem) return null;

  return (
    <div
      className="modal show d-block custom-modal-backdrop"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedItem.name || "Clothing Details"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <ClothingImage
              key={selectedItem.name}
              imagePath={selectedItem.filePath}
              altText={selectedItem.clothingType}
            />
            <p>
              <strong>Type:</strong> {selectedItem.clothingType}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedItem.description || "Not specified"}
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-between w-100">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                const isConfirmed = window.confirm(
                  "Are you sure you want to delete this clothing?"
                );
                if (isConfirmed) {
                  handleDeleteClothing();
                  handleCloseModal();
                }
              }}
            >
              Delete Clothing
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingModal;
