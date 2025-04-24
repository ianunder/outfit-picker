import React from "react";
import { Outfit } from "../../models/Outfit";
import ClothingImage from "../clothing/ClothingImage";
import { CLOTHING_TYPES } from "../../models/clothingTypes";

interface DisplayOutfitModalProps {
  outfit: Outfit | null;
  onClose: () => void;
  handleDeleteOutfit: () => void;
}

const DisplayOutfitModal: React.FC<DisplayOutfitModalProps> = ({
  outfit,
  onClose,
  handleDeleteOutfit,
}) => {
  if (!outfit) return null;

  const clothingKeyToProperty: Record<string, keyof Outfit> = {   // fix later
    hats: "hatImagePath",
    tops: "topImagePath",
    bottoms: "bottomImagePath",
    shoes: "shoesImagePath",
  };

  return (
    <div
      className="modal show d-block custom-modal-backdrop"
      tabIndex={-1}
    >
      <div
        className="modal-dialog"
        style={{ width: "500px", maxWidth: "500px" }}
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
          <div
            className="modal-body d-flex flex-column align-items-center"
            style={{
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <p className="mt-4">
              <strong>Description:</strong> {outfit.description}
            </p>
            {CLOTHING_TYPES.map((key) => {
              const propertyName = clothingKeyToProperty[key];
              const imagePath = outfit[propertyName] || null;

              return (
                <ClothingImage
                  key={key}
                  imagePath={imagePath as string | null}
                  altText={key}
                />
              );
            })}
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
};

export default DisplayOutfitModal;
