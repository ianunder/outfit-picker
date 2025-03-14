import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { ClothingItem } from "./ClothingItem";

export const CLOTHING_TYPES = ["hats", "tops", "bottoms", "shoes"] as const;
type ClothingType = (typeof CLOTHING_TYPES)[number];

interface ClothingState {
  clothing: Record<ClothingType, ClothingItem[]>;
  visibleClothingTypes: Record<ClothingType, boolean>;
  currentIndices: Record<ClothingType, number>;
}

const createInitialState = <T>(defaultValue: T): Record<ClothingType, T> =>
  Object.fromEntries(
    CLOTHING_TYPES.map((type) => [type, defaultValue])
  ) as Record<ClothingType, T>;

export const useClothingState = (userId: number) => {
  const initialState: ClothingState = {
    clothing: createInitialState([] as ClothingItem[]),
    visibleClothingTypes: createInitialState(true),
    currentIndices: createInitialState(0),
  };

  const [clothingData, setClothingData] = useState<ClothingState>(initialState);

  const fetchAllClothing = async () => {
    if (!userId) return;
    try {
      const response = await axiosInstance.get(`/clothing/findAllSorted`, {
        params: {
          uid: userId,
        },
      });
      const { HAT = [], TOP = [], BOTTOM = [], SHOES = [] } = response.data;
      setClothingData((prevState) => ({
        ...prevState,
        clothing: {
          ...prevState.clothing,
          hats: HAT,
          tops: TOP,
          bottoms: BOTTOM,
          shoes: SHOES,
        },
      }));
    } catch (error) {
      console.error("Error fetching clothing items", error);
    }
  };

  const handleScroll = (
    type: keyof ClothingState["clothing"],
    direction: "prev" | "next"
  ) => {
    setClothingData((prevState) => {
      const newIndex =
        direction === "prev"
          ? (prevState.currentIndices[type] -
              1 +
              prevState.clothing[type].length) %
            prevState.clothing[type].length
          : (prevState.currentIndices[type] + 1) %
            prevState.clothing[type].length;

      return {
        ...prevState,
        currentIndices: {
          ...prevState.currentIndices,
          [type]: newIndex,
        },
      };
    });
  };

  const handleRandomize = () => {
    const updatedIndices: Partial<Record<ClothingType, number>> = {};

    Object.keys(clothingData.clothing).forEach((type) => {
      const clothingList = clothingData.clothing[type as ClothingType];
      if (clothingList.length > 0) {
        updatedIndices[type as ClothingType] = Math.floor(
          Math.random() * clothingList.length
        );
      }
    });
    setClothingData((prev) => ({
      ...prev,
      currentIndices: { ...prev.currentIndices, ...updatedIndices },
    }));
  };

  return {
    clothingData: { ...clothingData },
    setVisibleClothingTypes: (
      updatedTypes: Partial<Record<ClothingType, boolean>>
    ) =>
      setClothingData((prev) => ({
        ...prev,
        visibleClothingTypes: { ...prev.visibleClothingTypes, ...updatedTypes },
      })),
    fetchAllClothing,
    handleScroll,
    handleRandomize,
  };
};
