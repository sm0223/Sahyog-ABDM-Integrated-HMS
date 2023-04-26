package com.sahyog.backend.entities;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CustomRequest {
    String userId;
    String healthId;
    String mobileOTP;
    String transactionId;
    String name;
    String display;
    String reason;
    String username;
    String consentId;
}

