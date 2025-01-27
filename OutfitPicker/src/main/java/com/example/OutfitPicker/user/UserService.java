package com.example.OutfitPicker.user;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService( UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findByUname(String uname){
        return userRepository.findByUname(uname);
    }

    public Optional<User> findUserById(Long id){
        return userRepository.findById(id);
    }


    public User registerUser(String uname, String password){

        String hash = passwordEncoder.encode(password);
        User newUser = new User(uname,hash);

        if(userRepository.findByUname(uname).isPresent()){
            return null;
        }

        return userRepository.save(newUser);

    }
    public boolean authenticate(String uname, String password){

        String hash = passwordEncoder.encode(password);
        Optional<User> user = userRepository.findByUname(uname);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User does not exist in database");
        }
        if(!passwordEncoder.matches(password, user.get().getPassword())){
            throw new BadCredentialsException("Password does not match");
        }

        return true;

    }

}
