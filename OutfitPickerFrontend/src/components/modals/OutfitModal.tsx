import React, { useState } from "react";
import { ClothingItem } from "../../models/ClothingItem";
import SaveOutfitModal from "./SaveOutfitModal";
import { CLOTHING_TYPES } from "../../models/clothingTypes";
import ClothingImage from "../clothing/ClothingImage";

interface OutfitModalProps {
  show: Boolean;
  onClose: () => void;
  selectedClothing: {
    [key in (typeof CLOTHING_TYPES)[number]]: ClothingItem | null;
  };
  onSaveSuccess: () => void;
}

const OutfitModal: React.FC<OutfitModalProps> = ({
  show,
  onClose,
  selectedClothing,
  onSaveSuccess,
}) => {
  const [showSaveOutfitModal, setShowSaveOutfitModal] = useState(false);

  const handleSaveOutfit = () => {
    setShowSaveOutfitModal(true);
  };

  const handleCloseBothModals = () => {
    setShowSaveOutfitModal(false);
    onSaveSuccess();
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal show d-block custom-modal-backdrop"
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Selected Outfit</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {CLOTHING_TYPES.map((key) => {
                const item = selectedClothing[key];
                return (
                  item && (
                    <p
                      key={key}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ClothingImage
                        key={item.name}
                        imagePath={item.filePath}
                        altText={item.clothingType}
                      />
                      <strong style={{ marginRight: "5px", marginLeft: "5px" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>
                      {item.name}
                    </p>
                  )
                );
              })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success me-auto"
                onClick={handleSaveOutfit}
              >
                Save New Outfit
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

      <SaveOutfitModal
        show={showSaveOutfitModal}
        onClose={() => setShowSaveOutfitModal(false)}
        selectedClothing={selectedClothing}
        onSaveSuccess={() => handleCloseBothModals()}
      />
    </>
  );
};

export default OutfitModal;
