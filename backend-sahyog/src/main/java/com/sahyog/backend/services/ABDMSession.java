package com.sahyog.backend.services;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.sahyog.backend.entities.Patient;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

public class ABDMSession {

    private String token;
    public ABDMSession() {
    }

    public ABDMSession(String token) {

        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public String setToken() throws Exception {

        var values = new HashMap<String, String>() {{
            put("clientId", "SBX_002715");
            put ("clientSecret", "fd5636d9-9349-465a-a2f7-9c94895b359b");
        }};

        var objectMapper = new ObjectMapper();
        String requestBody = objectMapper
                .writeValueAsString(values);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://dev.abdm.gov.in/gateway/v0.5/sessions"))
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .header("Content-Type", "application/json")
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
        this.token = new Util().getValueFromJsonString("accessToken", response.body());
//        System.out.println("Requestbody="+response.body());
        return requestBody;
    }

    public int patientInitUsingMobile(String healthId) throws Exception {
        String requestBody =  "{\n    \"requestId\": \""+UUID.randomUUID()+"\",\n    \"timestamp\": \""+ Instant.now().toString()+"\",\n    \"query\":{\n        \"id\": \""+healthId+"\",\n        \"purpose\": \"KYC_AND_LINK\",\n        \"authMode\": \"MOBILE_OTP\",\n        \"requester\": {\n            \"type\": \"HIP\",\n            \"id\": \"sahyog-hip-facility-iiitb\"\n        }\n    }\n}";
        System.out.println(requestBody);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://dev.abdm.gov.in/gateway/v0.5/users/auth/init"))
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .header("Content-Type", "application/json")
                .header("X-CM-ID", "sbx")
                .header("Authorization", "Bearer "+token)
                .build();
        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
        return response.statusCode();
    }

    public int confirmMobileOTP(String transactionId, String mobileOTP) throws Exception {
        String requestBody =  "{\n    \"requestId\": \""+ UUID.randomUUID()+"\",\n    \"timestamp\": \""+ Instant.now()+"\",\n    \"transactionId\": \""+ transactionId +"\",\n    \"credential\" : {\n        \"authCode\": \""+ mobileOTP +"\"\n    }\n}";
        System.out.println(requestBody);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm"))
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .header("Content-Type", "application/json")
                .header("X-CM-ID", "sbx")
                .header("Authorization", "Bearer "+token)
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
        return response.statusCode();
    }
}
