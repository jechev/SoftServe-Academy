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

  public addBook(book) {
    return axios.post(this.baseUrl, book);
  }

  public deleteBook(id) {
    return axios.delete(this.baseUrl + '/' + id);
  }

  public editBook(id, book) {
    return axios.put(this.baseUrl + '/' + id, book);
  }

  public getBookByUser(userId) {
    return axios.get(this.baseUrl + '?userId=' + userId + '&_embed=comments');
  }

  public getBooksByAuthor(author) {
    return axios.get(this.baseUrl + '?author=' + author);
  }
}
