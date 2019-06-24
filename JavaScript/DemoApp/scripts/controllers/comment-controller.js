import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

import userService from "../services/user-service";
import bookService from "../services/book-service";
import commentService from "../services/comment-service";

import header from "../../views/shared/header.mst";
import footer from "../../views/shared/footer.mst";

class CommentController {
  addComment(ctx) {
    let comment = {};
    comment.postDate = Date.now();
    comment.bookId = ctx.params.bookId;
    comment.userId = ctx.params.userId;
    comment.text = ctx.params.text;

    commentService
      .addComment(comment)
      .then(res => {
        alertify.success("You added new comment");
        ctx.redirect("#/books/" + comment.bookId);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = new CommentController();
