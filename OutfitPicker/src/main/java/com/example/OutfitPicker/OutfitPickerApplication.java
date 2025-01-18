package com.example.OutfitPicker;

import com.example.OutfitPicker.user.oldrepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
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

	@Bean
	public CommandLineRunner loadData(oldrepo oldrepo) {
		return args -> {



		};
	}
}
