import Mustache from "mustache";
import userService from "../services/user-service";
import bookService from "../services/book-service";

import homePage from "../../views/home/homePage.mst";
import header from "../../views/shared/header.mst";
import footer from "../../views/shared/footer.mst";

let self;
class HomeController {
  getHome(ctx) {
    console.log(ctx);
    let searchQuery = "";
    console.log(ctx.params);
    if (
      ctx.params.hasOwnProperty("search") &&
      ctx.params.hasOwnProperty("searchType")
    ) {
      searchQuery = "?" + ctx.params.searchType + "_like=" + ctx.params.search;
    }
    ctx.isAuth = userService.isAuth();
    ctx.email = sessionStorage.getItem("email");

    bookService
      .getAllBooks(searchQuery)
      .then(res => {
        ctx.books = res.data;
        // this.books = ctx.books;
        // this.filtered = ctx.books;
        ctx
          .loadPartials({
            header: header,
            footer: footer
          })
          .then(function() {
            this.partial(homePage);
            self.click(ctx);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  click(ctx) {
    setTimeout(_ => {
      const auth = document.querySelector(".tb-author");
      const title = document.querySelector(".tb-title");
      // auth.innerHTML = "authauthauth";
      // console.log("authauthauthauth", auth);
      auth.addEventListener("click", e => {
        // console.log("added listener");
        ctx.books = ctx.books.sort((a, b) => {
          return a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1;
        });
        ctx
          .loadPartials({
            header: header,
            footer: footer
          })
          .then(_ => {
            ctx.partial(homePage);
            self.click(ctx);
          });
      });
      title.addEventListener("click", e => {
        // console.log("added listener");
        ctx.books = ctx.books.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        });
        ctx
          .loadPartials({
            header: header,
            footer: footer
          })
          .then(_ => {
            ctx.partial(homePage);
            self.click(ctx);
          });
      });
    }, 500);
  }
}
self = new HomeController();
module.exports = self;
