import axios from "axios";

class BookService {
  constructor() {
    this.baseUrl = "http://localhost:3000/books";
  }

  getAllBooks() {
    return axios.get(this.baseUrl);
  }

  addBook(book) {
    return axios.post(this.baseUrl, book);
  }
}

module.exports = new BookService();
