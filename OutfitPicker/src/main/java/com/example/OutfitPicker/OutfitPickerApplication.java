package com.example.OutfitPicker;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class OutfitPickerApplication {

	public static void main(String[] args) {

		SpringApplication.run(OutfitPickerApplication.class, args);
	}

	@GetMapping("/")
	public String root(){
		return "Root";
	}

}

