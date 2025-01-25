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
public ResponseEntity<String> uploadClothing(
        @RequestParam("uname") String uname,
        @RequestParam("clothingName") String clothingName,
        @RequestParam("file") MultipartFile file,
        @RequestParam("description") String description,
        @RequestParam("userID") Long userID,
        @RequestParam("clothingType") String clothingType) throws IOException {



    Boolean upload = clothingService.uploadImage(file, clothingName, description, clothingType, uname, userID);

    if(upload){
        return new ResponseEntity<>("Clothing Uploaded", HttpStatus.OK);
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
    Boolean delete = clothingService.deleteClothing(clothingId);
    if (delete) {
        return new ResponseEntity<>(HttpStatus.OK);
    } else {
        return new ResponseEntity<>("Error deleting file", HttpStatus.BAD_REQUEST);
    }
}

@DeleteMapping("/deleteAll")
public ResponseEntity<String> deleteAllClothing(@RequestParam Long uid){

    Boolean delete = clothingService.deleteAllUserClothing(uid);
    if(delete){
        return new ResponseEntity<>(HttpStatus.OK);
    }else{
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}





}





