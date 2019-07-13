import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:3000/books';
  constructor() {}

  public getAllBooksWithCreator() {
    return axios.get(this.baseUrl + '?_expand=user');
  }

  public getBookById(id) {
    return axios.get(this.baseUrl + '/' + id + '?_embed=comments');
  }
}
