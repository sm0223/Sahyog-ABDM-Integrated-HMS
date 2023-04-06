package com.sahyog.backend.entities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class CustomRequest {
    String healthId;
    String mobileOTP;
    String transactionId;
    Visit visit;
    String display;


    public CustomRequest() {
    }

    public CustomRequest(String healthId, String mobileOTP, String transactionId, Visit visit, String display) {
        this.healthId = healthId;
        this.mobileOTP = mobileOTP;
        this.transactionId = transactionId;
        this.visit = visit;
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

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
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
                ", visit=" + visit +
                ", display='" + display + '\'' +
                '}';
    }
}

