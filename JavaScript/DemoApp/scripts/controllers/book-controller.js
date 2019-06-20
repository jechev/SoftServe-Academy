import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

import userService from "../services/user-service";
import bookService from "../services/book-service";

import header from "../../views/shared/header.mst";
import footer from "../../views/shared/footer.mst";
import addBook from "../../views/book/addBook.mst";

class BookController {
  getAddBook(ctx) {
    ctx
      .loadPartials({
        header: header,
        footer: footer
      })
      .then(function() {
        this.partial(addBook);
      });
  }
  addBook(ctx) {
    let book = {};
    userService
      .getUserInfo()
      .then(res => {
        book.userId = res.data[0].id;
        book.title = ctx.params.title;
        book.author = ctx.params.author;
        book.pages = ctx.params.pages;
        book.genre = ctx.params.genre;

        return bookService.addBook(book);
      })
      .then(res => {
        alertify.success("You added new book");
        ctx.redirect("#/home");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = new BookController();
