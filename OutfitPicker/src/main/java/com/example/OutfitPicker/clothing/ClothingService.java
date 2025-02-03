package com.example.OutfitPicker.clothing;

import com.example.OutfitPicker.Outfit.Outfit;
import com.example.OutfitPicker.Outfit.OutfitRepository;
import com.example.OutfitPicker.api.BackgroundRemoverService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.*;

@Service
public class ClothingService {

    private final ClothingRepository clothingRepository;
    private final OutfitRepository outfitRepository;
    private final BackgroundRemoverService backgroundRemoverService;

    private static final String UPLOAD_DIRECTORY = "uploads/";

    public ClothingService(ClothingRepository clothingRepository, OutfitRepository outfitRepository, BackgroundRemoverService backgroundRemoverService) {
        this.clothingRepository = clothingRepository;
        this.outfitRepository = outfitRepository;
        this.backgroundRemoverService = backgroundRemoverService;
    }

    public Clothing uploadClothing(MultipartFile file, String name, String description, String clothingType, String uname, Long userID) throws IOException {

        ByteArrayResource processedImage = backgroundRemoverService.removeImageBackground(file);  // This will block until the file is processed

        if (processedImage == null) {
           processedImage = new ByteArrayResource(file.getBytes());
        }

        String userDirPath = UPLOAD_DIRECTORY + uname;
        Path userDirectory = Paths.get(userDirPath);
        if (Files.notExists(userDirectory)) {
            Files.createDirectories(userDirectory);  // Creates the directory if it doesn't exist
        }

        String fileName = file.getOriginalFilename();
        Path path = Paths.get(userDirPath + "/" + fileName);

        if (Files.exists(path)) {
            return null;
        }

        try {
            Files.write(path, processedImage.getByteArray(), StandardOpenOption.CREATE_NEW);  // CREATE_NEW ensures the file doesn't already exist
        } catch (IOException e) {
            throw new IOException("Error saving the file: " + fileName, e);
        }

        String savedFilePath = "api/images/" + uname + "/" + fileName.replace("\\","/");
        Clothing newClothing = clothingRepository.save(new Clothing(savedFilePath,name,description,clothingType,userID));

        System.out.println(newClothing);
        return new Clothing("http://localhost:8080/" + savedFilePath, name, description, clothingType, userID, newClothing.getId());
    }

    public List<Clothing> findByUid(Long uid){

        List<Clothing> clothingList = clothingRepository.findByUid(uid);
        clothingList.forEach(clothing ->
                clothing.setFilePath("http://localhost:8080/" + clothing.getFilePath())
        );

        return clothingList;
    }


public List<Clothing> findByTypeAndUid(Long uid, String type){
    List<Clothing> clothingList = clothingRepository.findByUidAndClothingType(uid, ClothingType.valueOf(type));
    clothingList.forEach(clothing ->
            clothing.setFilePath("http://localhost:8080/" + clothing.getFilePath())
    );

    return clothingList;
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

public Map<ClothingType,List<Clothing>> findAllSorted(Long uid){

        List<Clothing> allClothes = clothingRepository.findByUid(uid);

        Map<ClothingType, List<Clothing>> sortedClothes = new EnumMap<>(ClothingType.class);
        sortedClothes.put(ClothingType.HAT, new ArrayList<>());
        sortedClothes.put(ClothingType.TOP, new ArrayList<>());
        sortedClothes.put(ClothingType.BOTTOM, new ArrayList<>());
        sortedClothes.put(ClothingType.SHOES, new ArrayList<>());

        for(Clothing item : allClothes){
            item.setFilePath("http://localhost:8080/" + item.getFilePath());
            sortedClothes.get(item.getClothingType()).add(item);
        }

    return sortedClothes;
}



}
