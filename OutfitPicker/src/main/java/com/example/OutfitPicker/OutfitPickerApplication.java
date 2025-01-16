package com.example.OutfitPicker;

import com.example.OutfitPicker.user.User;
import com.example.OutfitPicker.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
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
	public CommandLineRunner loadData(UserRepository userRepository) {
		return args -> {



		};
	}
}
