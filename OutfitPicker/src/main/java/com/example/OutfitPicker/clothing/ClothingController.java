package com.example.OutfitPicker.clothing;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/api/clothing")
public class ClothingController {

private final ClothingService clothingService;

public ClothingController(ClothingService clothingService){
    this.clothingService = clothingService;
}


@PostMapping("/upload")
public ResponseEntity<?> uploadClothing(
        @RequestParam("uname") String uname,
        @RequestParam("clothingName") String clothingName,
        @RequestParam("file") MultipartFile file,
        @RequestParam("description") String description,
        @RequestParam("userID") Long userID,
        @RequestParam("clothingType") String clothingType) throws IOException {



    clothingService.uploadImage(file, clothingName, description, clothingType, uname, userID);

    return new ResponseEntity<>("Clothing Uploaded", HttpStatus.OK);
}


}
