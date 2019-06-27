import alertify from "alertifyjs";

import userService from "../services/user-service";
import bookService from "../services/book-service";

import headerView from "../../views/shared/header.mst";
import addBookView from "../../views/book/addBook.mst";
import detailBookView from "../../views/book/detailBook.mst";
import editBookView from "../../views/book/editBook.mst";
import commentFormView from "../../views/comment/commentForm.mst";

class BookController {
  getAddBook(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.email = sessionStorage.getItem("email");

    ctx
      .loadPartials({
        header: headerView
      })
      .then(function() {
        this.partial(addBookView);
      });
  }

  getBookDetail(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.email = sessionStorage.getItem("email");
    let bookId = ctx.params.id;

    bookService.getBookById(bookId).then(res => {
      ctx.book = res.data;
      for (const comment of ctx.book.comments) {
        if (comment.author === ctx.email) {
          comment.isAuthor = true;
        } else {
          comment.isAuthor = false;
        }
      }
      let currentUserId = sessionStorage.getItem("userId");
      ctx.isCreator =
        Number(currentUserId) === Number(ctx.book.userId) ? true : false;

      ctx
        .loadPartials({
          header: headerView,
          commentForm: commentFormView
        })
        .then(function() {
          this.partial(detailBookView);
        });
    });
  }

  getEditBookDetail(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.email = sessionStorage.getItem("email");
    let bookId = ctx.params.id;

    bookService.getBookById(bookId).then(res => {
      ctx.book = res.data;

      ctx
        .loadPartials({
          header: headerView
        })
        .then(function() {
          this.partial(editBookView);
          setTimeout(_ => {
            document.editBookForm.genre.value = ctx.book.genre;
          }, 100);
        });
    });
  }

  editBook(ctx) {
    let bookId = ctx.params.id;
    let newTitle = ctx.params.title;
    let newAuthor = ctx.params.author;
    let newGenre = ctx.params.genre;
    let newPages = ctx.params.pages;
    bookService
      .editBook(bookId, newTitle, newAuthor, newGenre, newPages)
      .then(res => {
        alertify.success("You edit the book.");
        ctx.redirect("#/books/" + bookId);
      })
      .catch(err => {
        alertify.error(err);
      });
  }

  addBook(ctx) {
    let book = {};
    book.userId = Number(sessionStorage.getItem("userId"));
    book.title = ctx.params.title;
    book.author = ctx.params.author;
    book.pages = ctx.params.pages;
    book.genre = ctx.params.genre;

    bookService
      .addBook(book)
      .then(res => {
        alertify.success("You added new book");
        ctx.redirect("#/home");
      })
      .catch(err => {
        alertify.error(err);
      });
  }

  deleteBook(ctx) {
    let bookId = ctx.params.id;

    bookService
      .deleteBook(bookId)
      .then(res => {
        alertify.success("You deleted the book.");
        ctx.redirect("#/home");
      })
      .catch(err => {
        alertify.error(err);
      });
  }
}

module.exports = new BookController();
