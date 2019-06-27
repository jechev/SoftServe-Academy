import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

import userService from "../services/user-service";

import headerView from "../../views/shared/header.mst";
import loginPageView from "../../views/user/loginPage.mst";
import profileView from "../../views/user/profile.mst";
import registerPageView from "../../views/user/registerPage.mst";

class UserController {
  getRegister(ctx) {
    ctx
      .loadPartials({
        header: headerView
      })
      .then(function() {
        this.partial(registerPageView);
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
        header: headerView
      })
      .then(function() {
        this.partial(loginPageView);
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
          header: headerView
        })
        .then(function() {
          this.partial(profileView);
        });
    });
  }

  logoutUser(ctx) {
    userService.logout();
    alertify.success("You have successfully logged out!");
    ctx.redirect("#/home");
  }
}

module.exports = new UserController();
