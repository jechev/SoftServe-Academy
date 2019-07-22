import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:3000/messages';
  constructor() {}

  public sendMessage(message) {
    return axios.post(this.baseUrl, message);
  }

  public getMessagesForRecepient(userId) {
    return axios.get(this.baseUrl + '?recipientId=' + userId);
  }

  public getMessagesForSender(userId) {
    return axios.get(this.baseUrl + '?senderId=' + userId);
  }
}
