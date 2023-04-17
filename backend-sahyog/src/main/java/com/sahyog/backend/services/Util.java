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
    public String getValueFromString(String keypath, String text) throws Exception {
        int n1=text.length();
        int n2=keypath.length();
        int i;
        for(i=0;i<n1;i++){
            if(i+n2<n1 && keypath.equals(text.substring(i,i+n2))) break;
        }
        i=i+n2;
        StringBuilder sb=new StringBuilder();
        int flag=0;
        while(i<n1){
            if(flag==0 && text.charAt(i)=='\"'){
                flag=1;
            }
            else if(flag==1){
                if(text.charAt(i)=='\"') break;
                sb.append(text.charAt(i));
            }
            i++;
        }
        return sb.toString();
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
    public String getValueFromJsonString(String key, String text) throws Exception {
        JsonFactory f = new MappingJsonFactory();
        JsonParser jp = f.createJsonParser(text);
        JsonToken current;
        current = jp.nextToken();
        if (current != JsonToken.START_OBJECT) {
            System.out.println("Error: root should be object: quiting.");
            return "";
        }
        int i =0;
        while (jp.nextToken() != JsonToken.END_OBJECT) {
            String fieldName = jp.getCurrentName();
            current = jp.nextToken();
//            System.out.println(fieldName+"  :  ");
            if (fieldName.equals(key)) {
                String t = jp.readValueAsTree().toString();
                return t.substring(1, t.length()-1);
//                if (current == JsonToken.START_ARRAY) {
//                    // For each of the records in the array
//                    while (jp.nextToken() != JsonToken.END_ARRAY) {
//                        // read the record into a tree model,
//                        // this moves the parsing position to the end of it
//                        JsonNode node = jp.readValueAsTree();
//                        // And now we have random access to everything in the object
//                        System.out.println("field1: " + node.get("field1").toString());
//                        System.out.println("field2: " + node.get("field2").toString());
//                    }
//                } else {
//                    System.out.println("Error: records should be an array: skipping.");
//                    jp.skipChildren();
//                }
            } else {
//                System.out.println("Unprocessed property: " + fieldName);
                jp.skipChildren();
            }
        }
        return "";
    }
}