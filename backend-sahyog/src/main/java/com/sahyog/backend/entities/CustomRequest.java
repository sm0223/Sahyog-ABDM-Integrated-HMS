package com.sahyog.backend.entities;

public class CustomRequest {
    String userId;
    String healthId;
    String mobileOTP;
    String transactionId;

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public CustomRequest(String display) {
        this.display = display;
    }

    String name;
    String display;

    public CustomRequest(String userId, String healthId, String mobileOTP, String transactionId, String name) {
        this.userId = userId;
        this.healthId = healthId;
        this.mobileOTP = mobileOTP;
        this.transactionId = transactionId;
        this.name = name;
    }

    public CustomRequest() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getHealthId() {
        return healthId;
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

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CustomRequest{" +
                "userId='" + userId + '\'' +
                ", healthId='" + healthId + '\'' +
                ", mobileOTP='" + mobileOTP + '\'' +
                ", transactionId='" + transactionId + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}

