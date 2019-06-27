import userService from "../services/user-service";
import bookService from "../services/book-service";

import homePageView from "../../views/home/homePage.mst";

let self;
class HomeController {
  getHome(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.email = sessionStorage.getItem("email");
    let searchQuery = "";
    if (
      ctx.params.hasOwnProperty("search") &&
      ctx.params.hasOwnProperty("searchType")
    ) {
      searchQuery = "?" + ctx.params.searchType + "_like=" + ctx.params.search;
    }

    bookService
      .getAllBooks(searchQuery)
      .then(res => {
        ctx.books = res.data;

        ctx.partial(homePageView);
        self.click(ctx);
      })
      .catch(err => {
        console.log(err);
      });
  }

  click(ctx) {
    setTimeout(function() {
      const auth = document.querySelector(".tb-author");
      const title = document.querySelector(".tb-title");
      const genre = document.querySelector(".tb-genre");
      const pages = document.querySelector(".tb-pages");

      auth.addEventListener("click", e => {
        ctx.books = ctx.books.sort((a, b) => {
          return a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1;
        });

        ctx.partial(homePageView);
        self.click(ctx);
      });
      title.addEventListener("click", e => {
        ctx.books = ctx.books.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        });

        ctx.partial(homePageView);
        self.click(ctx);
      });

      genre.addEventListener("click", e => {
        ctx.books = ctx.books.sort((a, b) => {
          return a.genre.toLowerCase() > b.genre.toLowerCase() ? 1 : -1;
        });

        ctx.partial(homePageView);
        self.click(ctx);
      });

      pages.addEventListener("click", e => {
        ctx.books = ctx.books.sort((a, b) => {
          return a.pages > b.pages ? 1 : -1;
        });

        ctx.partial(homePageView);
        self.click(ctx);
      });
    }, 500);
  }
}
self = new HomeController();
module.exports = self;
