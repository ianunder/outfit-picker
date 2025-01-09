package com.example.OutfitPicker.clothing;


import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class ClothingRepository {

    private final JdbcClient db;

    public ClothingRepository(JdbcClient db){
        this.db = db;
    }

}
