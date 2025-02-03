import React, { useEffect, useState } from "react";
import { ClothingItem } from "../../models/ClothingItem.ts";
import axiosInstance from "../../api/axiosConfig.tsx";
import { useAuth } from "../authentication/AuthProvider.tsx";
import OutfitModal from "../modals/OutfitModal.tsx";
import "./HomePage.css";
import AddClothingButton from "../AddClothingButton.tsx";

const OutfitPickerUI = () => {
  const [clothing, setClothing] = useState({
    hats: [] as ClothingItem[],
    tops: [] as ClothingItem[],
    bottoms: [] as ClothingItem[],
    shoes: [] as ClothingItem[],
  });
  const { user } = useAuth();
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [currentIndices, setCurrentIndices] = useState({
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    fetchAllClothing();
  }, [user?.id]);

  const fetchAllClothing = async () => {
    if (!user?.id) return;
    try {
      const response = await axiosInstance.get(`/clothing/findAllSorted`, {
        params: {
          uid: user.id,
        },
      });
      const { HAT = [], TOP = [], BOTTOM = [], SHOES = [] } = response.data;
      setClothing({
        hats: HAT,
        tops: TOP,
        bottoms: BOTTOM,
        shoes: SHOES,
      });
    } catch (error) {
      console.error("Error fetching clothing items", error);
    }
  };

  const handleClothingAdded = () => {
    fetchAllClothing();
    setSuccessMessage("New clothing item added!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleScroll = (type: "top" | "bottom", direction: "prev" | "next") => {
    setCurrentIndices((prevIndices) => {
      const newIndex =
        direction === "prev"
          ? (prevIndices[type] - 1 + clothing[`${type}s`].length) %
            clothing[`${type}s`].length
          : (prevIndices[type] + 1) % clothing[`${type}s`].length;
      return { ...prevIndices, [type]: newIndex };
    });
  };

  const handleChooseOutfit = () => {
    setShowOutfitModal(true);
  };

  const handleOutfitSaveSuccess = () => {
    setSuccessMessage('Outfit saved successfully! View in "My Outfits".');

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleRandomize = () => {
    setCurrentIndices({
      top: Math.floor(Math.random() * clothing.tops.length),
      bottom: Math.floor(Math.random() * clothing.bottoms.length),
    });
  };

  return (
    <>
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1>{user && user.name}'s Closet</h1>
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
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="d-flex align-items-center mb-3">
                <button
                  className="btn btn-outline-secondary mr-2"
                  id="top-prev"
                  onClick={() => handleScroll("top", "prev")}
                >
                  ◀
                </button>
                <img
                  id="top-image"
                  src={
                    clothing.tops[currentIndices.top]?.filePath ||
                    "http://localhost:8080/images/imagePlaceholder.jpg"
                  }
                  alt="Top"
                  className="img-fluid rounded border"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "fill",
                  }}
                />
                <button
                  className="btn btn-outline-secondary ml-2"
                  id="top-next"
                  onClick={() => handleScroll("top", "next")}
                >
                  ▶
                </button>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary mr-2"
                  id="bottom-prev"
                  onClick={() => handleScroll("bottom", "prev")}
                >
                  ◀
                </button>
                <img
                  id="bottom-image"
                  src={
                    clothing.bottoms[currentIndices.bottom]?.filePath ||
                    "http://localhost:8080/images/imagePlaceholder.jpg"
                  }
                  alt="Bottom"
                  className="img-fluid rounded border"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "fill",
                  }}
                />
                <button
                  className="btn btn-outline-secondary ml-2"
                  id="bottom-next"
                  onClick={() => handleScroll("bottom", "next")}
                >
                  ▶
                </button>
              </div>
              <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleRandomize}>
                  🎲 Randomize
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                className="btn btn-danger btn-lg"
                onClick={handleChooseOutfit}
              >
                Choose Outfit
              </button>
            </div>
            <OutfitModal
              show={showOutfitModal}
              onClose={() => setShowOutfitModal(false)}
              selectedHat={clothing.hats[0]} // fix when hats and shoes added
              selectedTop={clothing.tops[currentIndices.top]}
              selectedBottom={clothing.bottoms[currentIndices.bottom]}
              selectedShoes={clothing.shoes[0]}
              onSaveSuccess={handleOutfitSaveSuccess}
            ></OutfitModal>
          </div>
        </div>
      </div>
      <AddClothingButton
        handleClothingAdded={handleClothingAdded}
      ></AddClothingButton>
    </>
  );
};

export default OutfitPickerUI;
