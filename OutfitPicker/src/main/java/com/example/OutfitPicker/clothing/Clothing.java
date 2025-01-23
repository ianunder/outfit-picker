package com.example.OutfitPicker.clothing;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Data
public class Clothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filePath;
    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private ClothingType clothingType;

    private Long uid;




    public Clothing() {
    }

    public Clothing(String filePath, String name, String description, String clothingType) {
        this.filePath = filePath;
        this.name = name;
        this.description = description;
        this.clothingType = ClothingType.valueOf(clothingType);
    }
}

