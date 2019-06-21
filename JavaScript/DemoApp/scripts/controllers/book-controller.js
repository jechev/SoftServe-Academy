import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

import userService from "../services/user-service";
import bookService from "../services/book-service";

import header from "../../views/shared/header.mst";
import footer from "../../views/shared/footer.mst";
import addBook from "../../views/book/addBook.mst";
import detailBook from "../../views/book/detailBook.mst"
import editBook from "../../views/book/editBook.mst";
import commentForm from "../../views/comment/commentForm.mst";

class BookController {
  getAddBook(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx
      .loadPartials({
        header: header,
        footer: footer
      })
      .then(function() {
        this.partial(addBook);
      });
  }

  getBookDetail(ctx){
    ctx.isAuth = userService.isAuth();
    let bookId = ctx.params.id;
    bookService.getBookById(bookId).then(res => {
      ctx.book = res.data;
      let currentUserId = sessionStorage.getItem("userId");
      ctx.isCreator = Number(currentUserId) === Number(ctx.book.userId) ? true : false;
      
      ctx
      .loadPartials({
        header: header,
        commentForm: commentForm,
        footer: footer
      })
      .then(function() {
        this.partial(detailBook);
      });
    })
  }

  getEditBookDetail(ctx) {
    ctx.isAuth = userService.isAuth();
    let bookId = ctx.params.id;
    bookService.getBookById(bookId).then(res => {
      ctx.book = res.data;

      switch (ctx.book.genre) {
        case "Art":
          ctx.artCheck = true;
          break;
        case "Autobiography":
          ctx.autobiographyCheck = true;
          break;
        case "Biography":
        ctx.biographyCheck = true;
        break;
        case "Book review":
          ctx.bookReviewCheck = true;
          break;
        case "Cookbook":
        ctx.cookbookCheck = true;
        break;
        case "Diary":
          ctx.diaryCheck = true;
          break;
        case "Dictionary":
        ctx.dictionaryCheck = true;
        break;
        case "Encyclopedia":
          ctx.encyclopediaCheck = true;
          break;
        case "Guide":
        ctx.guideCheck = true;
        break;
        case "Health":
          ctx.healthCheck = true;
          break;
        case "History":
        ctx.historyCheck = true;
        break;
        case "Journal":
          ctx.journalCheck = true;
          break;
        case "Math":
        ctx.mathCheck = true;
        break;
        case "Memoir":
        ctx.memoirCheck = true;
        break;
        case "prayer":
        ctx.prayerCheck = true;
        break;
        case "Religion":
        ctx.religionCheck = true;
        break;
        case "Textbook":
        ctx.textbookCheck = true;
        break;
        case "Review":
        ctx.reviewCheck = true;
        break;
        case "Sciene": 
        ctx.scienceCheck = true;
        break;
        case "Self help":
          ctx.selfHelpCheck = true;
          break;
        case "Travel":
          ctx.travelCheck = true;
          break;
        default:
          console.log("default");
          break;
      } 
      ctx.loadPartials({
        header: header,
        footer: footer
      })
      .then(function() {
        this.partial(editBook);
        console.log(document.editBookForm);
      })
    })
  }

  editBook(ctx) {
    let bookId = ctx.params.id;
    let newTitle = ctx.params.title;
    let newAuthor = ctx.params.author;
    let newGenre = ctx.params.genre;
    let newPages = ctx.params.pages;
    bookService.editBook(bookId, newTitle, newAuthor, newGenre, newPages).then(res => {
      alertify.success("You edit the book.");
      ctx.redirect("#/books/" + bookId);
    })
    .catch(err =>{
      console.log(err);
    })
    console.log(ctx);
  }
  
  addBook(ctx) {
    let book = {};
    book.userId = sessionStorage.getItem("userId");
    book.title = ctx.params.title;
    book.author = ctx.params.author;
    book.pages = ctx.params.pages;
    book.genre = ctx.params.genre;
    
    bookService.addBook(book)
    .then(res => {
      alertify.success("You added new book");
      ctx.redirect("#/home");
    })
    .catch(err => {
      console.log(err);
    });
  }

  deleteBook(ctx) {
    let bookId = ctx.params.id;

    bookService.deleteBook(bookId).then(res => {
      alertify.success("You deleted the book.")
      ctx.redirect("#/home");
    })
    .catch(err => {
      alertify.console.error(err);
    })
  }

}

module.exports = new BookController();
