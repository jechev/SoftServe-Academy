import userService from "../services/user-service";

import home from "../../views/shared/header.html";

//console.log(html);
class HomeController {
  getHome(ctx) {
    ctx.isAuth = userService.isAuth();
    //ctx.email = sessionStorage.getItem("email");
    console.log("Home controller");
    console.log(userService);
    console.log(ctx);
    let main = document.getElementById("main");
    main.innerHTML = home;
    //ctx.partial(home);
    // .then(function() {
    //   this.partial("../../views/home/homePage.hbs");
    // })
    // .catch(function(err) {
    //   console.log(err);
    // });
  }
}

module.exports = new HomeController();
