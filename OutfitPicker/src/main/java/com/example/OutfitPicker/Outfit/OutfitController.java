package com.example.OutfitPicker.Outfit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/outfits")
public class OutfitController {

    private final OutfitService outfitService;

    public OutfitController(OutfitService outfitService){
        this.outfitService = outfitService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createOutfit(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("uid") Long uid,
            @RequestParam(value = "hatId", required = false) Long hatId,
            @RequestParam(value = "topId", required = false) Long topId,
            @RequestParam(value = "bottomId", required = false) Long bottomId,
            @RequestParam(value = "shoesId", required = false) Long shoesId){

        outfitService.createOutfit(name, description,hatId,topId,bottomId,shoesId, uid);
        return new ResponseEntity<>("Outfit created", HttpStatus.CREATED);
    }

    @GetMapping("/myOutfits")
    public ResponseEntity<List<OutfitDTO>> findOutfitsByUid(@RequestParam Long uid){

        return new ResponseEntity<>(outfitService.findAllByUid(uid),HttpStatus.OK);
    }

    @GetMapping("/findById")
    public ResponseEntity<Outfit> findOutfitById(@RequestParam Long outfitId){

        Optional<Outfit> outfit = outfitService.findOutfitById(outfitId);
        if(outfit.isPresent()){
            return new ResponseEntity<>(outfit.get(),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteOutfitById(@RequestParam Long outfitId){

        Boolean isDeleted = outfitService.deleteOutfitById(outfitId);
        if(isDeleted){
            return new ResponseEntity<>("Outfit deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Error deleting outfit", HttpStatus.BAD_REQUEST);

    }



}
