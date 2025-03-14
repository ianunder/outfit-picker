import React, { useEffect, useState } from "react";
import { CLOTHING_TYPES, useClothingState } from "../../models/clothingTypes";

interface ToggleClothingModalProps {
  show: Boolean;
  onClose: () => void;
  setVisibleClothingTypes: (
    updatedTypes: Partial<Record<string, boolean>>
  ) => void;
  visibleClothingTypes: Partial<Record<string, boolean>>;
}

const ToggleClothingModal: React.FC<ToggleClothingModalProps> = ({
  show,
  onClose,
  setVisibleClothingTypes,
  visibleClothingTypes,
}) => {
  const initialCheckedItems = CLOTHING_TYPES.reduce((acc, key) => {
    acc[key] = visibleClothingTypes[key] ?? false;
    return acc;
  }, {} as Record<string, boolean>);

  const [checkedItems, setCheckedItems] =
    useState<Record<string, boolean>>(initialCheckedItems);

  const handleCheckboxChange = (type: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleConfirm = () => {
    setVisibleClothingTypes(checkedItems);
    onClose();
  };

  if (!show) return null;
  return (
    <div
      className="modal"
      style={{
        display: show ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-dialog"
        style={{ margin: "15% auto", maxWidth: "400px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Toggle Clothing Display</h5>
            <button className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form>
              {CLOTHING_TYPES.map((key) => (
                <div key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    checked={checkedItems[key]}
                    onChange={() => handleCheckboxChange(key)}
                  />
                  <label className="mx-1" htmlFor={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  </label>
                </div>
              ))}
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleClothingModal;
