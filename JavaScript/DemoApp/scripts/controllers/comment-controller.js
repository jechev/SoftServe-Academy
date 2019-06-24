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
    comment.bookId = Number(ctx.params.bookId);
    comment.userId = Number(ctx.params.userId);
    comment.text = ctx.params.text;
    comment.postDate = Date.now();

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
