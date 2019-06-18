const controllers = {}

window.addEventListener('DOMContentLoaded', () => {
  const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs');

    this.get('/index.html', controllers.getHome);
    this.get('/', controllers.getHome);
    this.get('#/home', controllers.getHome);

    this.get('#/register', controllers.getRegister);
    this.get('#/login', controllers.getLogin);
    this.post('#/register', controllers.registerUser);
    this.post('#/login', controllers.loginUser);
    this.get('#/logout', controllers.logoutUser);

  
  });
  app.run('#/home');
});

// run json server - json-server db.json -m ./node_modules/json-server-auth