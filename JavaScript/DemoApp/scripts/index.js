import homeController from "./controllers/home-controller";
import userController from "./controllers/user-controller";
import bookController from "./controllers/book-controller";
import commentController from "./controllers/comment-controller";

const app = Sammy("#main", function() {
  this.use("Mustache", "mst");

  this.get("/index.html", homeController.getHome);
  this.get("/", homeController.getHome);
  this.get("#/home", homeController.getHome);

  this.get("#/profile", userController.getProfile);
  this.get("#/register", userController.getRegister);
  this.get("#/login", userController.getLogin);
  this.post("#/register", userController.registerUser);
  this.post("#/login", userController.loginUser);
  this.get("#/logout", userController.logoutUser);

  this.get("#/addBook", bookController.getAddBook);
  this.post("#/addBook", bookController.addBook);
  this.get("#/books/:id", bookController.getBookDetail);
  this.get("/books/delete/:id", bookController.deleteBook);
  this.get("/books/edit/:id", bookController.getEditBookDetail);
  this.post("/books/edit/:id", bookController.editBook);

  this.post("#/addComment", commentController.addComment);
  this.get("#/comments/delete/:id", commentController.deleteComment);
});
app.run("#/home");

// run json server - json-server db.json -m ./node_modules/json-server-auth
