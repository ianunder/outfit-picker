package com.example.OutfitPicker.clothing;

public record Clothing(
        Integer id,
        String name,
        String color,
        String imageFilePath,
        ClothingType clothingType
)
{}
