import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

import userService from "../services/user-service";

import header from "../../views/shared/header.mst";
import footer from "../../views/shared/footer.mst";
import loginPage from "../../views/user/loginPage.mst";
import profile from "../../views/user/profile.mst";
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
        userService.saveToken(res);
        return userService.getUserInfo();
      })
      .then(res => {
        sessionStorage.setItem("userId", res.data[0].id);
        alertify.success("You are successfully logged in");
        ctx.redirect("#/home");
      })
      .catch(function(err) {
        console.log(err);
        alertify.error(err.response.data);
      });
  }

  getProfile(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.email = sessionStorage.getItem("email");
    let currentUserId = sessionStorage.getItem("userId");
    userService.userProfile(currentUserId).then(res => {
      console.log(res);
      ctx.user = res.data;
      ctx
        .loadPartials({
          header: header,
          footer: footer
        })
        .then(function() {
          this.partial(profile);
        });
    });
  }

  logoutUser(ctx) {
    userService.logout();
    ctx.redirect("#/home");
  }
}

module.exports = new UserController();
