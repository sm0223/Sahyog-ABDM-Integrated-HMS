package com.sahyog.backend.controller;

import com.sahyog.backend.auth.AuthenticationRequest;
import com.sahyog.backend.auth.AuthenticationResponse;
import com.sahyog.backend.auth.RegisterRequest;
import com.sahyog.backend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        System.out.println("REGISTER USER");
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println("USER LOGIN");
        return ResponseEntity.ok(service.authenticate(request));
    }

}