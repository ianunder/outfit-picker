package com.example.OutfitPicker.user;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("")
    public ResponseEntity<List<User>> findAll(){
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findById(@PathVariable Integer id){
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody Map<String, String> body){
        return new ResponseEntity<>(userService.registerUser(body.get("uname"), body.get("password")), HttpStatus.CREATED);
    }

    @PostMapping("/auth")
    public ResponseEntity<User> authenticateUser(@RequestBody Map<String, String> loginCredentials){

        Boolean auth = userService.authenticate(loginCredentials.get("uname"),loginCredentials.get("password"));
        if(auth){
            return new ResponseEntity<>(new User(0,loginCredentials.get("uname"),loginCredentials.get("password")), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


}
