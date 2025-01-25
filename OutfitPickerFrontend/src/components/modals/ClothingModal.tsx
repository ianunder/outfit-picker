import React, { useState } from 'react'
import {ClothingItem} from "../../models/ClothingItem.ts"

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
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
              <img
                src={
                  selectedItem.filePath ||
                  "http://localhost:8080/images/imagePlaceholder.jpg"
                }
                alt={selectedItem.name}
                className="img-fluid mb-3"
              />
              <p>
                <strong>Type:</strong> {selectedItem.clothingType}
              </p>
              <p>
                <strong>Description:</strong> {selectedItem.description || "Not specified"}
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