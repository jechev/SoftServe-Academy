import axios from "axios";

class userService {
  constructor() {
    this.baseUrl = "http://localhost:3000/";
  }

  register(email, password) {
    return axios.post(this.baseUrl + "register", {
      email: email,
      password: password
    });
  }

  login(email, password) {
    return axios.post(this.baseUrl + "login", {
      email: email,
      password: password
    });
  }

  saveToken(res) {
    sessionStorage.setItem("accessToken", res.data.accessToken);
    sessionStorage.setItem("email", JSON.parse(res.config.data).email);
  }

  isAuth() {
    return sessionStorage.getItem("accessToken") !== null;
  }

  logout() {
    sessionStorage.clear();
  }

  getUserInfo() {
    let email = sessionStorage.getItem("email");
    return axios.get(this.baseUrl + "users/?email=" + email);
  }
}

module.exports = new userService();
