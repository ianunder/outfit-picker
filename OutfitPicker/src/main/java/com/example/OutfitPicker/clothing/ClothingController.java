package com.example.OutfitPicker.clothing;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/clothing")
public class ClothingController {

private final ClothingService clothingService;

public ClothingController(ClothingService clothingService){
    this.clothingService = clothingService;
}


@PostMapping("/upload")
public ResponseEntity<Object> uploadClothing(
        @RequestParam("uname") String uname,
        @RequestParam("clothingName") String clothingName,
        @RequestParam("file") MultipartFile file,
        @RequestParam("description") String description,
        @RequestParam("userID") Long userID,
        @RequestParam("clothingType") String clothingType) throws IOException {



    Clothing uploadedClothing = clothingService.uploadClothing(file, clothingName, description, clothingType, uname, userID);

    if(uploadedClothing != null){
        return new ResponseEntity<>(uploadedClothing, HttpStatus.OK);
    }
    return new ResponseEntity<>("Clothing Upload failed", HttpStatus.CONFLICT);
}

@GetMapping("/myClothes")
public ResponseEntity<List<Clothing>> getClothingByUid(@RequestParam Long uid){


    List<Clothing> clothingList = clothingService.findByUid(uid);
    return new ResponseEntity<>(clothingList,HttpStatus.OK);
}
@GetMapping("/byType")
public ResponseEntity<List<Clothing>> getClothingByTypeAndUid(@RequestParam Long uid, @RequestParam String clothingType){

    List<Clothing> clothingList = clothingService.findByTypeAndUid(uid, clothingType);

    return new ResponseEntity<>(clothingList, HttpStatus.OK);

}

@DeleteMapping("/delete")
    public ResponseEntity<String> deleteClothing(@RequestParam Long clothingId) {

    Boolean usedInOutfit = clothingService.usedInOutfit(clothingId);
    if(!usedInOutfit){
        return new ResponseEntity<>("Can not delete clothing item that is used in saved outfit", HttpStatus.BAD_REQUEST);
    }else {
        Boolean delete = clothingService.deleteClothing(clothingId);
        if (delete) {
            return new ResponseEntity<>("Clothing deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error deleting file", HttpStatus.BAD_REQUEST);
        }
    }
}

@DeleteMapping("/deleteAll")
public ResponseEntity<String> deleteAllClothing(@RequestParam Long uid) {

    Boolean delete = clothingService.deleteAllUserClothing(uid);
    if (delete) {
        return new ResponseEntity<>(HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

@GetMapping("findAllSorted")
public ResponseEntity<Map<ClothingType, List<Clothing>>> getSortedClothing(@RequestParam Long uid){

    return new ResponseEntity<>(clothingService.findAllSorted(uid), HttpStatus.OK);
}



}











