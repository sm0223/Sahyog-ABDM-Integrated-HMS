import axios from "axios";
import configData from './apiConfig.json'
const api = axios.create(
    {
      baseURL : configData['url']
    }
);

const login = async (username, password) => {
  console.log("user : ", username, password)
  const data = {
    username: username,
    password: password
  }
  const response = await api.post("/api/auth/authenticate", data);
  return response.data;
}

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};