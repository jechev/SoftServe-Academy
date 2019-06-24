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
    let currentDate = new Date();
    let formatted_date =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate() +
      " " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();

    comment.bookId = Number(ctx.params.bookId);
    comment.userId = Number(ctx.params.userId);
    comment.author = sessionStorage.getItem("email");
    comment.text = ctx.params.text;
    comment.postDate = formatted_date;

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

  deleteComment(ctx) {
    let commentId = ctx.params.id;
    let bookId;
    commentService
      .getCommentById(commentId)
      .then(res => {
        bookId = res.data.bookId;

        return commentService.deleteComment(commentId);
      })
      .then(res => {
        alertify.success("You deleted comment");
        ctx.redirect("#/books/" + bookId);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = new CommentController();
