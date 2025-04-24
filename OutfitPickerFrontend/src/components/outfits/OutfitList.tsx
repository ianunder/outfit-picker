import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Outfit } from "../../models/Outfit.ts";
import { useAuth } from "../authentication/AuthProvider.tsx";
import DisplayOutfitModal from "../modals/DisplayOutfitModal.tsx";
import ClothingImage from "../clothing/ClothingImage.tsx";
import { CLOTHING_TYPES } from "../../models/clothingTypes.ts";

const OutfitList = () => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    axiosInstance
      .get(`/outfits/myOutfits`, {
        params: {
          uid: user.id,
        },
      })
      .then((response) => {
        setOutfits(response.data);
      })
      .catch((error) => console.error(`Error fetching outfits`, error));
  }, [user]);

  const handleOutfitClick = (outfitId: number) => {
    setSelectedOutfit(outfits.find((outfit) => outfit.id === outfitId) || null);
  };

  const handleCloseModal = () => {
    setSelectedOutfit(null);
  };

  const handleDeleteOutfit = async () => {
    if (!selectedOutfit) return;
    try {
      const response = await axiosInstance.delete("/outfits/delete", {
        params: {
          outfitId: selectedOutfit.id,
        },
      });
      setOutfits((prevItems) =>
        prevItems.filter((item) => item.id !== selectedOutfit.id)
      );
      console.log("Deletion successful", response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const clothingKeyToProperty: Record<string, keyof Outfit> = {
    hats: "hatImagePath",
    tops: "topImagePath",
    bottoms: "bottomImagePath",
    shoes: "shoesImagePath",
  };

  return (
    <>
      <div className="container py-5">
        <h1 className="text-center mb-4 text-white">{user?.name}'s Outfits</h1>

        <div className="row">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="col-md-4 mb-4">
              <div
                className="card border-primary"
                style={{
                  cursor: "pointer",
                  border: "3px solid #007bff",
                  borderRadius: "10px",
                }}
                onClick={() => handleOutfitClick(outfit.id)}
              >
                
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
            </div>
          ))}
        </div>
      </div>
      <DisplayOutfitModal
        outfit={selectedOutfit}
        onClose={handleCloseModal}
        handleDeleteOutfit={handleDeleteOutfit}
      />
    </>
  );
};

export default OutfitList;
