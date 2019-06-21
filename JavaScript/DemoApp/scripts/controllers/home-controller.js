import Mustache from "mustache";
import userService from "../services/user-service";
import bookService from "../services/book-service";

import homePage from "../../views/home/homePage.mst";
import header from "../../views/shared/header.mst";
import footer from "../../views/shared/footer.mst";

class HomeController {
  getHome(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.email = sessionStorage.getItem("email");

    bookService
      .getAllBooks()
      .then(res => {
        ctx.books = res.data;
        ctx
          .loadPartials({
            header: header,
            footer: footer
          })
          .then(function() {
            this.partial(homePage);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = new HomeController();
