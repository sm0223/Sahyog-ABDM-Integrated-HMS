package com.sahyog.backend.entities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class CustomRequest {
    String healthId;
    String mobileOTP;
    String transactionId;
    public CustomRequest() {
    }

    public CustomRequest(String healthId) {
        this.healthId = healthId;
    }

    public CustomRequest(String healthId, String mobileOTP, String transactionId) {
        this.healthId = healthId;
        this.transactionId = transactionId;
        this.mobileOTP = mobileOTP;
    }

    public String getHealthId() {
        return healthId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public void setHealthId(String healthId) {
        this.healthId = healthId;
    }

    public String getMobileOTP() {
        return mobileOTP;
    }

    public void setMobileOTP(String mobileOTP) {
        this.mobileOTP = mobileOTP;
    }

    @Override
    public String toString() {
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String json = ow.writeValueAsString(this);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
    }
}
}

