import React, { useEffect, useState } from "react";
import { ClothingItem } from "../../models/ClothingItem.ts";
import axiosInstance from "../../api/axiosConfig.tsx";
import { useAuth } from "../authentication/AuthProvider.tsx";
import OutfitModal from "../modals/OutfitModal.tsx";
import "./HomePage.css";
import AddClothingButton from "../AddClothingButton.tsx";
import ToggleClothingModal from "../modals/ToggleClothingModal.tsx";
import { CLOTHING_TYPES, useClothingState } from "../../models/clothingTypes";
import ClothingImage from "./ClothingImage.tsx";

const OutfitPickerUI = () => {
  const { user } = useAuth();
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [showToggleClothingModal, setShowToggleClothingModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    clothingData,
    setVisibleClothingTypes,
    fetchAllClothing,
    handleScroll,
    handleRandomize,
  } = useClothingState(user?.id as number);

  useEffect(() => {
    fetchAllClothing();
  }, [user?.id]);

  const handleClothingAdded = () => {
    fetchAllClothing();
    setSuccessMessage("New clothing item added!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleOutfitSaveSuccess = () => {
    setSuccessMessage('Outfit saved successfully! View in "My Outfits".');

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  return (
    <>
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1>{user && user.name}'s Closet </h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowToggleClothingModal(true)}
          >
            Toggle Clothing Types
          </button>
        </div>

        {successMessage && (
          <div
            className="alert alert-success"
            role="alert"
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
          >
            {successMessage}
          </div>
        )}

        <div className="row justify-content-center">
          {Object.keys(clothingData.visibleClothingTypes).map((type) =>
            clothingData.visibleClothingTypes[
              type as keyof typeof clothingData.visibleClothingTypes
            ] ? (
              <div className="col-md-6" key={type}>
                <div className="d-flex flex-column align-items-center mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <button
                      className="btn btn-outline-secondary mr-2"
                      id={`${type}-prev`}
                      onClick={() =>
                        handleScroll(
                          type as keyof typeof clothingData.clothing,
                          "prev"
                        )
                      }
                    >
                      ◀
                    </button>
                    <ClothingImage
                      key={`${type}-image`}
                      imagePath={
                        clothingData.clothing[
                          type as keyof typeof clothingData.clothing
                        ][
                          clothingData.currentIndices[
                            type as keyof typeof clothingData.currentIndices
                          ]
                        ]?.filePath ||
                        "http://localhost:8080/images/imagePlaceholder.jpg"
                      }
                      altText={type.charAt(0).toUpperCase() + type.slice(1)}
                    />
                    <button
                      className="btn btn-outline-secondary ml-2"
                      id={`${type}-next`}
                      onClick={() =>
                        handleScroll(
                          type as keyof typeof clothingData.clothing,
                          "next"
                        )
                      }
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleRandomize}>
            Randomize
          </button>
        </div>

        <div className="text-center mt-3">
          <button
            className="btn btn-danger btn-lg"
            onClick={() => setShowOutfitModal(true)}
          >
            Choose Outfit
          </button>
        </div>

        <OutfitModal
          show={showOutfitModal}
          onClose={() => setShowOutfitModal(false)}
          selectedClothing={CLOTHING_TYPES.reduce((acc, key) => {
            acc[key] = clothingData.visibleClothingTypes[key]
              ? clothingData.clothing[key][clothingData.currentIndices[key]]
              : null;
            return acc;
          }, {} as { [key in (typeof CLOTHING_TYPES)[number]]: ClothingItem | null })}
          onSaveSuccess={handleOutfitSaveSuccess}
        />

        <ToggleClothingModal
          show={showToggleClothingModal}
          onClose={() => setShowToggleClothingModal(false)}
          setVisibleClothingTypes={setVisibleClothingTypes}
          visibleClothingTypes={clothingData.visibleClothingTypes}
        />

        <AddClothingButton handleClothingAdded={handleClothingAdded} />
      </div>
    </>
  );
};

export default OutfitPickerUI;
