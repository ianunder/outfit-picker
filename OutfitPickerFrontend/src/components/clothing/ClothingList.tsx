import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import {ClothingItem} from "../../models/ClothingItem.ts"


const ClothingList: React.FC<{ userId: string | null }> = ({ userId }) => {
  const [clothing, setClothing] = useState<ClothingItem[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/clothing/${userId}`)
      .then((response) => {
        console.log("adasda", response.data);
        setClothing(response.data);
      })

      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div>
      {clothing.map((item) => (
        <div key={item.id}>
          <img
            src={item.filePath}
            alt={item.name}
            style={{ width: "200px", height: "auto" }}
          />

          <h3>{item.name}</h3>
          <h3>{item.filePath}</h3>
          <p>{item.description}</p>
          <p>Type: {item.clothingType}</p>
        </div>
      ))}
    </div>
  );
};

export default ClothingList;
