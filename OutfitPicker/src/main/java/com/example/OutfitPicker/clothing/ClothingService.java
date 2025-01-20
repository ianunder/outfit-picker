package com.example.OutfitPicker.clothing;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ClothingService {

    private final ClothingRepository clothingRepository;

    private static final String UPLOAD_DIRECTORY = "uploads/";


    public ClothingService(ClothingRepository clothingRepository) {
        this.clothingRepository = clothingRepository;
    }

    public void uploadImage(MultipartFile file, String name, String description, String clothingType, String uname, Long userID) throws IOException {

        String userDirPath = UPLOAD_DIRECTORY + uname;
        File userDirectory = new File(userDirPath);
        if (!userDirectory.exists()) {
            userDirectory.mkdirs();  // Creates the directory if it doesn't exist
        }

        String fileName = file.getOriginalFilename();
        Path path = Paths.get(userDirPath + "/" + fileName);
        file.transferTo(path);

        Clothing newClothing = new Clothing();
        newClothing.setFilePath(path.toString());
        newClothing.setName(name);
        newClothing.setDescription(description);
        newClothing.setClothingType(ClothingType.valueOf(clothingType));
        newClothing.setUid(userID);

        clothingRepository.save(newClothing);
        System.out.println(newClothing);
        
    }
}
