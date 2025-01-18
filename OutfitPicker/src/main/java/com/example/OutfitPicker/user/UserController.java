package com.example.OutfitPicker.user;

import com.example.OutfitPicker.security.JwtUtil;
import org.apache.coyote.Response;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    @GetMapping("")
    public ResponseEntity<List<User>> findAll(){
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findById(@PathVariable Long id){
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> body){
        String uname = body.get("uname");
        String password = body.get("password");

        User check = userService.findByUname(body.get("uname"));

        if(check != null){
            return new ResponseEntity<>("Username already taken",HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(userService.registerUser(body.get("uname"), body.get("password")), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginCredentials){

        String uname = loginCredentials.get("uname");
        String password = loginCredentials.get("password");
        boolean isAuthenticated = userService.authenticate(uname,password);
        if(isAuthenticated){
            String token = jwtUtil.generateToken(uname);
            Map<String, Object> response = Map.of(
                    "token", token,
                    "uname", uname
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid credentials",HttpStatus.UNAUTHORIZED);
    }


}
