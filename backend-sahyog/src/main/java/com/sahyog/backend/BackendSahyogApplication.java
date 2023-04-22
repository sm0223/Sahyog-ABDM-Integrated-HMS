package com.sahyog.backend;
import com.sahyog.backend.auth.RegisterRequest;
import com.sahyog.backend.entities.Role;
import com.sahyog.backend.entities.User;
import com.sahyog.backend.services.AuthenticationService;
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
    public static void main(String[] args) {
        SpringApplication.run(BackendSahyogApplication.class, args);
    }
    @Bean
    CommandLineRunner runner(AuthenticationService authenticationService) {
        return args -> {
            authenticationService.register(new RegisterRequest("admin","admin",Role.ADMIN));
        };
    }
}
