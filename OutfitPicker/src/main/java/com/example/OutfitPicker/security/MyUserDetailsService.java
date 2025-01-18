package com.example.OutfitPicker.security;

import com.example.OutfitPicker.user.UserRepository;
import com.example.OutfitPicker.user.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUname(username);
        if(user == null){
            throw new UsernameNotFoundException("User does not exist in database");

        }

        return new UserPrincipal(user);
    }
}
