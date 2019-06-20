import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";
import userService from "../services/user-service";

import header from "../../views/shared/header.mst";
import footer from "../../views/shared/footer.mst";
import loginPage from "../../views/user/loginPage.mst";
import registerPage from "../../views/user/registerPage.mst";

class UserController {
  getRegister(ctx) {
    ctx
      .loadPartials({
        header: header,
        footer: footer
      })
      .then(function() {
        this.partial(registerPage);
      });
  }

  registerUser(ctx) {
    let email = ctx.params.email;
    let password = ctx.params.password;

    userService
      .register(email, password)
      .then(res => {
        alertify.success("You have successfully registered!");
        ctx.redirect("#/home");
      })
      .catch(function(err) {
        alertify.error(err.response.data);
      });
  }

  getLogin(ctx) {
    ctx
      .loadPartials({
        header: header,
        footer: footer
      })
      .then(function() {
        this.partial(loginPage);
      });
  }

  loginUser(ctx) {
    let email = ctx.params.email;
    let password = ctx.params.password;

    userService
      .login(email, password)
      .then(res => {
        console.log(res);
        alertify.success("You are successfully logged in");
        userService.saveToken(res);
        ctx.redirect("#/home");
      })
      .catch(function(err) {
        console.log(err);
        alertify.error(err.response.data);
      });
  }

  logoutUser(ctx) {
    userService.logout();
    ctx.redirect("#/home");
  }
}

module.exports = new UserController();
