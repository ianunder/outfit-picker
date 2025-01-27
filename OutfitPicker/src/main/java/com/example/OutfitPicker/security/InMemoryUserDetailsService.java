package com.example.OutfitPicker.security;

import com.example.OutfitPicker.user.UserRepository;
import com.example.OutfitPicker.user.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InMemoryUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    public InMemoryUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUname(username);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User does not exist in database");

        }

        return new UserPrincipal(user.get());
    }
}
