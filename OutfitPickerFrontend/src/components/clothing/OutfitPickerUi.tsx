import React, { useEffect, useState } from 'react'
import {ClothingItem} from "../../models/ClothingItem.ts"
import axiosInstance from '../../api/axiosConfig.tsx';
import { useAuth } from '../authentication/AuthProvider.tsx';

const OutfitPickerUI = () => {

const [tops, setTops] = useState<ClothingItem[]>([]);
const [bottoms, setBottoms] = useState<ClothingItem[]>([]);
const {user} = useAuth();

useEffect(() => {
  const fetchClothingByType = (type: "TOP" | "BOTTOM", setState: React.Dispatch<React.SetStateAction<ClothingItem[]>>) => {
    if (!user?.id) return;
    axiosInstance.get(`/clothing/byType`, {
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

  fetchClothingByType("TOP", setTops);
  fetchClothingByType("BOTTOM", setBottoms);
}, [user?.id]);



const handleScroll = ( // handle scrolling through clothing items on button press
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

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1>Cher's Closet</h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-center mb-4">
            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-outline-secondary mr-2" id="top-prev" onClick={() => handleScroll("top", "prev")}>
                ◀
              </button>
              <img
                id="top-image"
                src={tops[0]?.filePath || "http://localhost:8080/images/imagePlaceholder.jpg"}
                alt="Top"
                className="img-fluid rounded border"
              />
              <button className="btn btn-outline-secondary ml-2" id="top-next" onClick={() => handleScroll("top", "next")}>
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
                src={bottoms[0]?.filePath || "http://localhost:8080/images/imagePlaceholder.jpg"}
                alt="Bottom"
                className="img-fluid rounded border"
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
            <button className="btn btn-danger btn-lg">Choose Outfit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutfitPickerUI