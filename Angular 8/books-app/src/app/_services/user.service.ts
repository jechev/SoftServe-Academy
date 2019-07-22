import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/';
  constructor() {}

  public login(email, password) {
    return axios.post(this.baseUrl + 'login', {
      email,
      password
    });
  }

  public register(email, password) {
    return axios.post(this.baseUrl + 'register', {
      email,
      password
    });
  }

  public getAllUsers() {
    return axios.get(this.baseUrl + 'users');
  }

  public saveToken(res) {
    sessionStorage.setItem('accessToken', res.data.accessToken);
    sessionStorage.setItem('email', JSON.parse(res.config.data).email);
  }

  public isAuth() {
    return sessionStorage.getItem('accessToken') !== null;
  }

  public logout() {
    sessionStorage.clear();
  }

  public getUserDetails() {
    const email = sessionStorage.getItem('email');
    return axios.get(this.baseUrl + 'users/?email=' + email);
  }
}
