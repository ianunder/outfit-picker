package com.example.OutfitPicker.Outfit;


import com.example.OutfitPicker.clothing.Clothing;
import com.example.OutfitPicker.clothing.ClothingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OutfitService {

    private final OutfitRepository outfitRepository;
    private final ClothingRepository clothingRepository;

    public OutfitService(OutfitRepository outfitRepository, ClothingRepository clothingRepository){
        this.outfitRepository = outfitRepository;
        this.clothingRepository = clothingRepository;
    }

    public Outfit createOutfit(String name, String description, Long hatId, Long topId, Long bottomId, Long shoesId, Long uid){

       return outfitRepository.save(new Outfit(name,description,hatId,topId,bottomId,shoesId, uid));
    }

    public List<OutfitDTO> findAllByUid(Long uid){

        List<Outfit> outfits = outfitRepository.findAllByUid(uid);

        return outfits.stream().map(outfit -> {
            Clothing hat = null;
            if (outfit.getHatId() != null) {
                hat = clothingRepository.findById(outfit.getHatId()).orElse(null);
            }

            Clothing top = null;
            if (outfit.getTopId() != null) {
                top = clothingRepository.findById(outfit.getTopId()).orElse(null);
            }

            Clothing bottom = null;
            if (outfit.getBottomId() != null) {
                bottom = clothingRepository.findById(outfit.getBottomId()).orElse(null);
            }

            Clothing shoes = null;
            if (outfit.getShoesId() != null) {
                shoes = clothingRepository.findById(outfit.getShoesId()).orElse(null);
            }

            return new OutfitDTO(
                    outfit.getId(),
                    outfit.getName(),
                    outfit.getDescription(),
                    hat != null ? "http://localhost:8080/" + hat.getFilePath() : null,
                    top != null ? "http://localhost:8080/" + top.getFilePath() : null,
                    bottom != null ? "http://localhost:8080/" + bottom.getFilePath() : null,
                    shoes != null ? "http://localhost:8080/" + shoes.getFilePath() : null);
        }).collect(Collectors.toList());
    }

    public Optional<Outfit> findOutfitById(Long id){
        return outfitRepository.findById(id);
    }

    public Boolean deleteOutfitById(Long id){

        Optional<Outfit> outfit = outfitRepository.findById(id);
        if(outfit.isEmpty()){
            return false;
        }
        outfitRepository.deleteById(id);
        return true;
    }


}
