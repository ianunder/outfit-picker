package com.example.OutfitPicker.Outfit;

import com.example.OutfitPicker.clothing.ClothingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OutfitRepository extends JpaRepository<Outfit, Long> {

    List<Outfit> findAllByUid(Long uid);

    @Query("SELECT o FROM Outfit o WHERE o.hatId = :clothingId OR o.topId = :clothingId OR o.bottomId = :clothingId OR o.shoesId = :clothingId")
    List<Outfit> findAllByClothingId(@Param("clothingId") Long clothingId);


}
