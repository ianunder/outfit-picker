import React, { Dispatch, SetStateAction, useState } from "react";
import AddClothingModal from "./modals/AddClothingModal";

const AddClothingButton: React.FC<{
  handleClothingAdded: () => void;
}> = ({ handleClothingAdded }) => {
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
        <AddClothingModal
          show={showModal}
          onClose={() => setShowModal(false)}
          handleClothingAdded={handleClothingAdded}
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
