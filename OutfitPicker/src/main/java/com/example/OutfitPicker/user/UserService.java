package com.example.OutfitPicker.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Integer id){
        return userRepository.findById(id);
    }

    public User registerUser(String uname, String password){

        String hash = passwordEncoder.encode(password);
        User newUser = new User(0,uname,hash);

        userRepository.save(uname,hash);
        return newUser;

    }
    public boolean authenticate(String uname, String password){

        String hash = passwordEncoder.encode(password);
        Optional<User> user = userRepository.findByUname(uname);

        if (user.isPresent()) {
            return passwordEncoder.matches(password, user.get().password());
        }
        return false;

    }

}
