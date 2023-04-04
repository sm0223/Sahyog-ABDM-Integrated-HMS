import axios from "axios";
import configData from './apiConfig.json'
const api = axios.create(
    {
      baseURL : configData['url']
    }
);

const login = async (username, password) => {
  console.log("user : ", username, password)
  if(password =="pass") {
    const responseData = {
      userId: "shubham0223@sbx",
      userName: "Shubham",
      userType: username,
      status: "verified",
    }
    return responseData;
  }
  else {
    return null;
  }
}

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};