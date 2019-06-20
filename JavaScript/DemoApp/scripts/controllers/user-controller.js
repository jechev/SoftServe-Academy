import alertify from "alertifyjs";
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
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  registerUser(ctx) {
    let email = ctx.params.email;
    let password = ctx.params.password;

    userService
      .register(email, password)
      .then(res => {
        console.log(res);
        ctx.redirect("#/home");
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getLogin(ctx) {
    console.log("login");

    ctx
      .loadPartials({
        header: header,
        footer: footer
      })
      .then(function() {
        this.partial(loginPage);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  loginUser(ctx) {
    let email = ctx.params.email;
    let password = ctx.params.password;

    userService
      .login(email, password)
      .then(res => {
        alertify.success("ok");
        userService.saveToken(res);
        ctx.redirect("#/home");
      })
      .catch(function(err) {
        alertify.error("err");
        console.log(err);
      });
  }

  logoutUser(ctx) {
    userService.logout();
    ctx.redirect("#/home");
  }
}

module.exports = new UserController();
