import axios from "axios";

class BookService {
  constructor() {
    this.baseUrl = "http://localhost:3000/books";
  }

  getAllBooks() {
    return axios.get(this.baseUrl);
  }

  getBookById(id) {
    return axios.get(this.baseUrl + "/" + id);
  }

  addBook(book) {
    return axios.post(this.baseUrl, book);
  }

  deleteBook(id) {
    return axios.delete(this.baseUrl + "/" + id);
  }

  editBook(id, title, author, genre, pages) {
    return axios.patch(this.baseUrl + "/" + id,{
      title: title,
      author: author,
      genre: genre,
      pages: pages
    })
  }
}

module.exports = new BookService();
