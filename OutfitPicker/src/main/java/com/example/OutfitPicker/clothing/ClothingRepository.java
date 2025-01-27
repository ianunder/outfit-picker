package com.example.OutfitPicker.clothing;


import com.example.OutfitPicker.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothingRepository extends JpaRepository<Clothing, Long> {

        List<Clothing> findByUid(Long userid);

        List<Clothing> findByUidAndClothingType(Long uid, ClothingType clothingType);


        void deleteAllByUid(Long uid);


}
