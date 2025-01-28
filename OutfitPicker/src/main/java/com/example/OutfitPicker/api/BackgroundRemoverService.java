package com.example.OutfitPicker.api;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class BackgroundRemoverService {

    private final WebClient webClient;

    public BackgroundRemoverService(WebClient webClient) {
        this.webClient = webClient;
    }

    @Value("${BG_REMOVER_API_URL}")
    private String apiUrl;

    @Value("${BG_REMOVER_API_KEY}")
    private String apiKey;

    public ByteArrayResource removeImageBackground(MultipartFile image) {

        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("image_file", image.getResource(), MediaType.MULTIPART_FORM_DATA);
        bodyBuilder.part("size", "auto");

        byte[] response = webClient.post()
                .uri(apiUrl)
                .header("X-Api-Key", apiKey)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .bodyValue(bodyBuilder.build())
                .retrieve()
                .bodyToMono(byte[].class).block();

        if(response == null){
            return null;
        }
        return new ByteArrayResource(response);
    }


}
