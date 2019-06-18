controllers.getRegister = function(ctx) {
  ctx.loadPartials({
    header: '../../views/shared/header.hbs',
    footer: '../../views/shared/footer.hbs'
  }).then(function () {
    this.partial('../../views/user/registerPage.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

controllers.registerUser = function (ctx) {
  let email = ctx.params.email;
  let password = ctx.params.password;

  userService.register(email, password).then((res) => {
    console.log(res);
    ctx.redirect('#/home');
  }).catch(function (err) {
    console.log(err);
  });
}

controllers.getLogin = function(ctx) {
  console.log('login');
  ctx.loadPartials({
    header: '../../views/shared/header.hbs',
    footer: '../../views/shared/footer.hbs'
  }).then(function (){
    this.partial('../../views/user/loginPage.hbs');
  }).catch(function (err) {
    console.log(err);
  })
}

controllers.loginUser = function(ctx) {
  let email = ctx.params.email;
  let password = ctx.params.password;

  userService.login(email, password).then((res) => {
    console.log(res);
    userService.saveToken(res);
    ctx.redirect('#/home');
  }).catch(function (err) {
    console.log(err);
  });
}

controllers.logoutUser = function(ctx) {
  userService.logout();
  ctx.redirect('#/home');
}

