package com.example.OutfitPicker.Outfit;

import lombok.Data;

@Data

public class OutfitDTO {

    private Long id;
    private String name;
    private String description;
    private String hatImagePath;
    private String topImagePath;
    private String bottomImagePath;
    private String shoesImagePath;


    public OutfitDTO(Long outfitId, String outfitName, String description, String hatImagePath, String topImagePath, String bottomImagePath, String shoesImagePath) {
        this.id = outfitId;
        this.name = outfitName;
        this.description = description;
        this.hatImagePath = hatImagePath;
        this.topImagePath = topImagePath;
        this.bottomImagePath = bottomImagePath;
        this.shoesImagePath = shoesImagePath;
    }
}
