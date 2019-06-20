import homeController from "./controllers/home-controller";
import userController from "./controllers/user-controller";

const app = Sammy("#main", function() {
  this.use("Mustache", "mst");

  this.get("/index.html", homeController.getHome);
  this.get("/", homeController.getHome);
  this.get("#/home", homeController.getHome);
  this.get("#/register", userController.getRegister);
  this.get("#/login", userController.getLogin);
  this.post("#/register", userController.registerUser);
  this.post("#/login", userController.loginUser);
  this.get("#/logout", userController.logoutUser);
});
app.run("#/home");

// run json server - json-server db.json -m ./node_modules/json-server-auth
