package com.sahyog.backend.entities;

public class CustomRequest {
    String healthId;
    String mobileOTP;
    String transactionId;
    String name;
    String display;


    public CustomRequest() {
    }

    public CustomRequest(String healthId, String mobileOTP, String transactionId, String visit, String display) {
        this.healthId = healthId;
        this.mobileOTP = mobileOTP;
        this.transactionId = transactionId;
        this.name = visit;
        this.display = display;
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

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    @Override
    public String toString() {
        return "CustomRequest{" +
                "healthId='" + healthId + '\'' +
                ", mobileOTP='" + mobileOTP + '\'' +
                ", transactionId='" + transactionId + '\'' +
                ", visit=" + name +
                ", display='" + display + '\'' +
                '}';
    }
}

