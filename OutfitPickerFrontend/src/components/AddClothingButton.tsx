import React, { useState } from "react";
import ClothingUpload from "./modals/ClothingUpload";

const AddClothingButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary fab"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {showModal && (
        <ClothingUpload
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      <style>{`
        .fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }
      `}</style>
    </>
  );
};

export default AddClothingButton;