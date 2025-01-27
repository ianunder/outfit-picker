package com.example.OutfitPicker.clothing;

import com.example.OutfitPicker.Outfit.Outfit;
import com.example.OutfitPicker.Outfit.OutfitRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ClothingService {

    private final ClothingRepository clothingRepository;
    private final OutfitRepository outfitRepository;

    private static final String UPLOAD_DIRECTORY = "uploads/";

    public ClothingService(ClothingRepository clothingRepository, OutfitRepository outfitRepository) {
        this.clothingRepository = clothingRepository;
        this.outfitRepository = outfitRepository;
    }

    public Clothing uploadClothing(MultipartFile file, String name, String description, String clothingType, String uname, Long userID) throws IOException {

        String userDirPath = UPLOAD_DIRECTORY + uname;
        File userDirectory = new File(userDirPath);
        if (!userDirectory.exists()) {
            userDirectory.mkdirs();  // Creates the directory if it doesn't exist
        }

        String fileName = file.getOriginalFilename();
        Path path = Paths.get(userDirPath + "/" + fileName);

        if(Files.exists(path)){
            return null;
        }
        file.transferTo(path);

        String savedFilePath = "api/images/" + uname + "/" + fileName.replace("\\","/");
        Clothing newClothing = clothingRepository.save(new Clothing(savedFilePath,name,description,clothingType,userID));

        System.out.println(newClothing);
        return new Clothing("http://localhost:8080/" + savedFilePath, name, description, clothingType, userID, newClothing.getId());
    }

    public List<Clothing> findByUid(Long uid){

        List<Clothing> clothingList = clothingRepository.findByUid(uid);
        return clothingList.stream()
                .map(clothing -> new Clothing(
                        "http://localhost:8080/" + clothing.getFilePath(),  // Include the full URL
                        clothing.getName(),
                        clothing.getDescription(),
                        clothing.getClothingType().name(),
                        clothing.getUid(),
                        clothing.getId()
                ))
                .toList();
    }


public List<Clothing> findByTypeAndUid(Long uid, String type){
    List<Clothing> clothingList = clothingRepository.findByUidAndClothingType(uid, ClothingType.valueOf(type));
    return clothingList.stream()
            .map(clothing -> new Clothing(
                    "http://localhost:8080/" + clothing.getFilePath(),  // Include the full URL
                    clothing.getName(),
                    clothing.getDescription(),
                    clothing.getClothingType().name(),
                    clothing.getUid(),
                    clothing.getId()
            ))
            .toList();
}

public Boolean deleteClothing(Long clothingId){

        Optional<Clothing> clothing = clothingRepository.findById(clothingId);
        String baseDirectory = System.getProperty("user.dir");

        if(clothing.isEmpty()){
            return false;
        }
        String filePathOnSystem = baseDirectory + "/uploads" + clothing.get().getFilePath().substring(10);

    try {
        File file = new File(filePathOnSystem);

        if (file.exists()) {
            clothingRepository.deleteById(clothingId);
            return file.delete();
        } else {
            System.out.println("File not found: " + clothing.get().getFilePath());
            return false;
        }
    } catch (Exception e) {
        System.err.println("Error deleting file: " + e.getMessage());
        return false;
    }

}

public Boolean deleteAllUserClothing(Long uid){

        List<Clothing> clothingList = clothingRepository.findByUid(uid);
        String baseDirectory = System.getProperty("user.dir") + "/uploads";

        clothingList.forEach(item -> {
            String filePathOnSystem = baseDirectory + item.getFilePath().substring(10);

            try {
                File file = new File(filePathOnSystem);

                if (file.exists()) {
                    file.delete();
                } else {
                    System.out.println("File not found: " + filePathOnSystem);
                }
            } catch (Exception e) {
                System.err.println("Error deleting file: " + e.getMessage());
            }

            clothingRepository.deleteAllByUid(uid);

        });
        return true;
}

public Boolean usedInOutfit(Long clothingId){

        List<Outfit> outfits = outfitRepository.findAllByClothingId(clothingId);
    return outfits.isEmpty();

}



}
