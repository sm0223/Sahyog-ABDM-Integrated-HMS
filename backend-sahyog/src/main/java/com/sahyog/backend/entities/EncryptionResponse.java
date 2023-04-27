package com.sahyog.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EncryptionResponse {
    private String encryptedData;
    private String keyToShare;
}
