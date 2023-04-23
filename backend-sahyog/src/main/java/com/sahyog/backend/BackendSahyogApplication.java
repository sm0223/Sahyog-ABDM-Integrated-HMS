package com.sahyog.backend;
import com.sahyog.backend.auth.RegisterRequest;
import com.sahyog.backend.entities.Role;
import com.sahyog.backend.entities.User;
import com.sahyog.backend.repo.UserRepository;
import com.sahyog.backend.services.AuthenticationService;
import com.sahyog.backend.services.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@SpringBootApplication
public class BackendSahyogApplication{

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private UserRepository userRepository;
    public static void main(String[] args) {
        SpringApplication.run(BackendSahyogApplication.class, args);
    }

    @PostConstruct
    public void initAdmin(){
        if(!userRepository.existsById(1)) {
            User user = new User("admin",
                    "$2a$12$mjW5FJ61aekU0mWHU.OyWOBdJRvGUHqnMSy0g8ppF9YwoFv/.3MrC"
                    ,Role.ADMIN);
            userRepository.save(user);
        }
    }
}
