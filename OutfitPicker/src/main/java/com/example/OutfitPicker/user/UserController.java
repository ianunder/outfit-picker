package com.example.OutfitPicker.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("")
    public ResponseEntity<List<User>> findAll(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findById(@PathVariable Integer id){
        return new ResponseEntity<>(userRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestParam String uname){
        return new ResponseEntity<>(userRepository.createUser(uname), HttpStatus.CREATED);
    }

}
