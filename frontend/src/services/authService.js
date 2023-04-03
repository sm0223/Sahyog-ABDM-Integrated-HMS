import axios from "axios";

const api = axios.create(
    {
      baseURL : 'https://0ebc-119-161-98-68.in.ngrok.io/'
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