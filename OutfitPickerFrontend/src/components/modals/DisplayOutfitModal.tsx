import React from 'react'
import { Outfit } from '../../models/Outfit';
import axiosInstance from '../../api/axiosConfig';


interface DisplayOutfitModalProps {
    outfit: Outfit | null;
    onClose: () => void;
    handleDeleteOutfit: () => void;
}


const DisplayOutfitModal: React.FC<DisplayOutfitModalProps> = ({ outfit, onClose, handleDeleteOutfit }) => {


   if(!outfit) return null;

  return (
    
    <div
    className="modal show d-block"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    tabIndex={-1}
  >
    <div
      className="modal-dialog"
      style={{ width: "500px", maxWidth: "500px" }} // Fixed width for modal
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{outfit.name}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <img
              src={outfit.topImagePath}
              alt="Top"
              className="img-fluid rounded border"
              style={{
                width: "100%",  // Full width of the modal
                height: "auto", // Adjust height to maintain aspect ratio
                maxHeight: "250px", // Limit the maximum height of the image
                objectFit: "fill", // Make sure image fits within the container
              }}
            />
          </div>
          <div className="mb-3">
            <img
              src={outfit.bottomImagePath}
              alt="Bottom"
              className="img-fluid rounded border"
              style={{
                width: "100%",  // Full width of the modal
                height: "auto", // Adjust height to maintain aspect ratio
                maxHeight: "250px", // Limit the maximum height of the image
                objectFit: "fill", // Make sure image fits within the container
              }}
            />
          </div>
          <p className="mt-4">
            <strong>Description:</strong> {outfit.description}
          </p>
        </div>
        <div className="modal-footer d-flex justify-content-between w-100">
        <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  const isConfirmed = window.confirm(
                    "Are you sure you want to delete this outfit?"
                  );
                  if (isConfirmed) {
                    handleDeleteOutfit();
                    onClose();
                  }
                }}
              >
                Delete Outfit
              </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default DisplayOutfitModal