import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { ClothingItem } from "../../models/ClothingItem.ts";
import { useAuth } from "../authentication/AuthProvider.tsx";
import "./ClothingList.css";
import ClothingModal from "../modals/DisplayClothingModal.tsx";
import AddClothingButton from "../AddClothingButton.tsx";
import { AxiosError } from "axios";

const ClothingList = () => {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<String | null>("");
  const [successMessage, setSuccessMessage] = useState<String | null>("");

  useEffect(() => {
    fetchClothingItems();
  }, [user]);

  const fetchClothingItems = async () => {
    if (!user?.id) return;
    try {
      const response = await axiosInstance.get(`/clothing/myClothes`, {
        params: {
          uid: user.id,
        },
      });
      setClothingItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error("Error fetching clothing items", error);
    }
  };

  const handleClothingAdded = async () => {
    fetchClothingItems();

    setSuccessMessage("New clothing item added!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);

    setFilter("ALL");
  };

  const handleFilterChange = (type: string) => {
    setFilter(type);
    if (type === "ALL") {
      setFilteredItems(clothingItems);
    } else {
      const filtered = clothingItems.filter(
        (item) => item.clothingType === type
      );
      setFilteredItems(filtered);
    }
  };

  const handleCloseModal = () => setSelectedItem(null);

  const handleDeleteClothing = async () => {
    if (!selectedItem) return;
    try {
      const response = await axiosInstance.delete("/clothing/delete", {
        params: {
          clothingId: selectedItem.id,
        },
      });

      setClothingItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItem.id)
      );
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItem.id)
      );
      console.log("Deletion successful", response.data);

      setErrorMessage("Clothing item deleted.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400) {
          setErrorMessage(
            "Unable to delete clothing item that is being used in a saved outfit"
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        }
        console.error("Error fetching data", error);
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        {user && user.name}'s Clothing Collection
      </h2>

      {errorMessage && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          {errorMessage}
        </div>
      )}

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

      <div className="mb-4 text-center">
        <select
          className="form-select"
          value={filter}
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
                src={
                  item.filePath ||
                  "http://localhost:8080/images/imagePlaceholder.jpg"
                }
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
      <AddClothingButton
        handleClothingAdded={handleClothingAdded}
      ></AddClothingButton>
    </div>
  );
};

export default ClothingList;
