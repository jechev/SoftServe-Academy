import axios from "axios";

class CommentService {
  constructor() {
    this.baseUrl = "http://localhost:3000/comments";
  }

  getCommentById(id) {
    return axios.get(this.baseUrl + "/" + id);
  }

  addComment(comment) {
    return axios.post(this.baseUrl, comment);
  }

  deleteComment(id) {
    return axios.delete(this.baseUrl + "/" + id);
  }
}

module.exports = new CommentService();
