package com.sahyog.backend.services;

import com.sahyog.backend.entities.User;
import com.sahyog.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class UserService  {
    @Autowired
    private UserRepository userRepository;
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).
                orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

}
