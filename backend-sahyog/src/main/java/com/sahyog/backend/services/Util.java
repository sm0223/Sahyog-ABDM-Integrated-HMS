package com.sahyog.backend.services;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MappingJsonFactory;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONObject;
//import org.codehaus.jackson.map.*;
//import org.codehaus.jackson.*;

import java.io.File;

public class Util{

    public String getTransactionId(String response) {
        JSONObject responseObject = new JSONObject(response);
        JSONObject auth = (JSONObject) responseObject.get("auth");
        return auth.get("transactionId").toString();
    }
    public static String getAccessToken(String response)
    {
        JSONObject responseObject = new JSONObject(response);
        JSONObject auth = (JSONObject) responseObject.get("auth");
        return auth.get("accessToken").toString();
    }
    public String getRequestId(String response) {
        JSONObject responseObject = new JSONObject(response);
        JSONObject resp = (JSONObject) responseObject.get("resp");
        return resp.get("requestId").toString();
    }
    public String getConsentStatus(String response) {
        JSONObject responseObject = new JSONObject(response);
        JSONObject auth = (JSONObject) responseObject.get("notification");
        return auth.get("status").toString();
    }
    public String getConsentId(String response) {
        JSONObject responseObject = new JSONObject(response);
        JSONObject auth = (JSONObject) responseObject.get("notification");
        return auth.get("consentId").toString();
    }
    public String getABDMRequestID(String response) {
        return new JSONObject(response).get("requestId").toString();
    }
    public String getValueFromString2(String keypath1, String keypath2, String text) throws Exception {
        int n1=text.length();
        int n2=keypath1.length();
        int n3=keypath2.length();
        int i,j;
        for(i=0;i<n1;i++) {
            if(i+n2<n1 && keypath1.equals(text.substring(i,i+n2))) break;
        }
        i=i+n2;
        for (j = i; j < n1; j++) {
            if(j+n3<n1 && keypath2.equals(text.substring(j,j+n3))) break;
        }
        System.out.println(text.substring(i,j-1));
        return text.substring(i,j-2);
    }



}