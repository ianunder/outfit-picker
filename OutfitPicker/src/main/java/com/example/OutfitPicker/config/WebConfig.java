package com.example.OutfitPicker.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow CORS for all endpoints
                .allowedOrigins("http://localhost:5173")  // Allow your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow the methods your app uses
                .allowedHeaders("*");  // Allow all headers
    }
}