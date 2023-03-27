package com.sahyog.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
public class MainController {
    @GetMapping("/register/abha-address")
    public void register() {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://dev.abdm.gov.in/gateway/v0.5/users/auth/init"))
                .header("X-RapidAPI-Host", "jokes-by-api-ninjas.p.rapidapi.com")
                .header("X-RapidAPI-Key", "your-rapidapi-key")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(response.body());
    }

}
