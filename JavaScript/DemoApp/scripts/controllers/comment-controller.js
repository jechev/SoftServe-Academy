import alertify from "alertifyjs";

import commentService from "../services/comment-service";

class CommentController {
  addComment(ctx) {
    let comment = {};
    let currentDate = new Date();
    let formatedDate =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate() +
      " " +
      currentDate
        .getHours()
        .toString()
        .padStart(2, "0") +
      ":" +
      currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0") +
      ":" +
      currentDate
        .getSeconds()
        .toString()
        .padStart(2, "0");

    comment.bookId = Number(ctx.params.bookId);
    comment.userId = Number(sessionStorage.getItem("userId"));
    comment.author = sessionStorage.getItem("email");
    comment.text = ctx.params.text;
    comment.postDate = formatedDate;

    commentService
      .addComment(comment)
      .then(res => {
        alertify.success("You added new comment");
        ctx.redirect("#/books/" + comment.bookId);
      })
      .catch(err => {
        alertify.error(err);
      });
  }
}

module.exports = new CommentController();
