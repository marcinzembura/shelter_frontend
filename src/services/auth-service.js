import axios from "axios";
import toast from 'react-hot-toast';
const API_URL = "http://localhost:8080/api/auth/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.status;
      });
  }

  logout() {
    localStorage.removeItem("user");
    toast.error("Wylogowano z systemu")

  }

  register(username, password, name, surname, phone_number,email) {
    return axios.post(API_URL + "signup", {
      username,
      password,
      name,
      surname,
      phone_number,
      email
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();