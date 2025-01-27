import React, { useEffect, useState } from "react";
import { ClothingItem } from "../../models/ClothingItem.ts";
import axiosInstance from "../../api/axiosConfig.tsx";
import { useAuth } from "../authentication/AuthProvider.tsx";
import OutfitModal from "../modals/OutfitModal.tsx";
import "./HomePage.css";
import AddClothingButton from "../AddClothingButton.tsx";

const OutfitPickerUI = () => {
  const [hats, setHats] = useState<ClothingItem[]>([]);
  const [tops, setTops] = useState<ClothingItem[]>([]);
  const [bottoms, setBottoms] = useState<ClothingItem[]>([]);
  const [shoes, setShoes] = useState<ClothingItem[]>([]);
  const { user } = useAuth();
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchClothingByType("HAT", setHats);
    fetchClothingByType("TOP", setTops);
    fetchClothingByType("BOTTOM", setBottoms);
    fetchClothingByType("SHOES", setShoes);
  }, [user?.id]);

  const fetchClothingByType = (
    type: "HAT" | "TOP" | "BOTTOM" | "SHOES",
    setState: React.Dispatch<React.SetStateAction<ClothingItem[]>>
  ) => {
    if (!user?.id) return;
    axiosInstance
      .get(`/clothing/byType`, {
        params: {
          uid: user.id,
          clothingType: type,
        },
      })
      .then((response) => {
        setState(response.data);
      })
      .catch((error) =>
        console.error(`Error fetching ${type.toLowerCase()}s:`, error)
      );
  };

  const handleClothingAdded = (clothingType: string) => {
    const setterMap: Record<string, React.Dispatch<React.SetStateAction<ClothingItem[]>>> = {
      HAT: setHats,
      TOP: setTops,
      BOTTOM: setBottoms,
      SHOES: setShoes,
    };
    const setState = setterMap[clothingType];
    fetchClothingByType(
      clothingType as "HAT" | "TOP" | "BOTTOM" | "SHOES",
      setState
    );

    setSuccessMessage("New clothing item added!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleScroll = (
    // handle scrolling through clothing items on button press
    type: "top" | "bottom",
    direction: "prev" | "next"
  ) => {
    const updateClothing = (prevList: ClothingItem[]) => {
      const currentIndex = 0;
      const newIndex =
        direction === "prev"
          ? (currentIndex - 1 + prevList.length) % prevList.length
          : (currentIndex + 1) % prevList.length;
      return [...prevList.slice(newIndex), ...prevList.slice(0, newIndex)];
    };

    if (type === "top") {
      setTops(updateClothing);
    } else if (type === "bottom") {
      setBottoms(updateClothing);
    }
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
                    tops[0]?.filePath ||
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
                    bottoms[0]?.filePath ||
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
              selectedHat={hats[0]}
              selectedTop={tops[0]}
              selectedBottom={bottoms[0]}
              selectedShoes={shoes[0]}
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
