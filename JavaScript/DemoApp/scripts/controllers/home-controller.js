controllers.getHome = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.email = sessionStorage.getItem('email');

  ctx.loadPartials({
    header: '../../views/shared/header.hbs',
    footer: '../../views/shared/footer.hbs'
  }).then(function () {
    this.partial('../../views/home/homePage.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}