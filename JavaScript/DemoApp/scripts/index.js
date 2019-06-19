import homeController from "./controllers/home-controller";

console.log(homeController);

const app = Sammy("#main", function() {
  this.use("Mustache", "mst");

  this.get("/index.html", homeController.getHome);
  this.get("/", homeController.getHome);
  this.get("#/home", homeController.getHome);
  // this.get("#/register", controllers.getRegister);
  // this.get("#/login", controllers.getLogin);
  // this.post("#/register", controllers.registerUser);
  // this.post("#/login", controllers.loginUser);
  // this.get("#/logout", controllers.logoutUser);
});
app.run("#/home");
console.log("index.js");

// run json server - json-server db.json -m ./node_modules/json-server-auth
