import axios from "axios";

class BookService {
  constructor() {
    this.baseUrl = "http://localhost:3000/books";
  }

  addBook(book) {
    return axios.post(this.baseUrl, book);
  }
}

module.exports = new BookService();
