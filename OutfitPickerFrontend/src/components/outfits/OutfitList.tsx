import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import {Outfit} from "../../models/Outfit.ts"
import { useAuth } from "../authentication/AuthProvider.tsx";
import DisplayOutfitModal from "../modals/DisplayOutfitModal.tsx";



const OutfitList = () => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [outfits, setOutfits] = useState<Outfit[]> ([]);
  const {user} = useAuth();

  useEffect(() => {
      if (!user?.id) return;
      axiosInstance.get(`/outfits/myOutfits`, {
          params: {
            uid: user.id,
          },
        })
        .then((response) => {
          setOutfits(response.data);
          console.log(response.data);
        })
        .catch((error) =>
          console.error(`Error fetching outfits`, error)
        );
  }, [user]);
  

    const handleOutfitClick = (outfitId : number) => {
        setSelectedOutfit(outfits.find((outfit) => outfit.id === outfitId) || null)
    }

    const handleCloseModal = () => {
        setSelectedOutfit(null);
      };

      const handleDeleteOutfit = async () => {
        if (!selectedOutfit) return;
        try {
          const response = await axiosInstance.delete("/outfits/delete", {
            params: {
              outfitId: selectedOutfit.id
            }
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


  return (
    <>
    <div className="container py-5">
    <h1 className="text-center mb-4">{user?.name}'s Outfits</h1>
    
    <div className="row">
      {outfits.map((outfit) => (
        <div key={outfit.id} className="col-md-4 mb-4">
          <div
            className="card border-primary"
            style={{ 
                cursor: "pointer",
                border: "3px solid #007bff", 
                borderRadius: "10px",}}
            onClick={() => handleOutfitClick(outfit.id)}
          >
            <img
              src={outfit.topImagePath}
              alt="Top"
              className="card-img-top"
              style={{ height: "200px", objectFit: "fill" }}
            />
            <div className="card-body">
              <img
                src={outfit.bottomImagePath}
                alt="Bottom"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "fill",
                }}
              />
            </div>
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