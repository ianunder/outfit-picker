import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import {ClothingItem} from "../../models/ClothingItem.ts"
import { useAuth } from "../authentication/AuthProvider.tsx";
import "./ClothingList.css"
import ClothingModal from "../modals/ClothingModal.tsx";
import AddClothingButton from "../AddClothingButton.tsx";


const ClothingGrid = () => {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]> ([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]> ([]);
  const {user} = useAuth();

  useEffect(() => {
      if (!user?.id) return;
      axiosInstance.get(`/clothing/myClothes`, {
          params: {
            uid: user.id,
          },
        })
        .then((response) => {
          setClothingItems(response.data);
          setFilteredItems(response.data);
        })
        .catch((error) =>
          console.error(`Error fetching clothing items`, error)
        );
  }, [user]);
  
  const handleFilterChange = (type: string) => {
    if (type === "ALL") {
      setFilteredItems(clothingItems);
    } else {
      const filtered = clothingItems.filter((item) => item.clothingType === type);
      setFilteredItems(filtered); 
    }
  };

  const handleCloseModal = () => setSelectedItem(null);

  const handleDeleteClothing = async () => {
    if (!selectedItem) return;
    try {
      const response = await axiosInstance.delete("/clothing/delete", {
        params: {
          clothingId: selectedItem.id
        }
      });

      setClothingItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItem.id)
      );
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItem.id)
      );
      console.log("Deletion successful", response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
    

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">{user && user.name}'s Clothing Collection</h2>

      <div className="mb-4 text-center">
        <select
          className="form-select"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="ALL">All Clothing</option>
          <option value="TOP">Tops</option>
          <option value="BOTTOM">Bottoms</option>
          <option value="SHOES">Shoes</option>
          <option value="HAT">Hats</option>
        </select>
      </div>

      <div className="row row-cols-2 row-cols-md-4 g-4">
        {filteredItems.map((item) => (
          <div className="col" key={item.id}>
            <div
              className="card h-100"
              onClick={() => setSelectedItem(item)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.filePath || "http://localhost:8080/images/imagePlaceholder.jpg"}
                alt={item.name}
                className="card-img-top img-fluid rounded"
                style={{ height: "200px", objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      </div>

      <ClothingModal
        selectedItem={selectedItem}
        handleCloseModal={handleCloseModal}
        handleDeleteClothing={handleDeleteClothing}
      />
      <AddClothingButton></AddClothingButton>

    </div>
  );
};

export default ClothingGrid;