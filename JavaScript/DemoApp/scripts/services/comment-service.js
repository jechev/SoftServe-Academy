import axios from "axios";

class CommentService {
  constructor() {
    this.baseUrl = "http://localhost:3000/comments";
  }

  addComment(comment) {
    return axios.post(this.baseUrl, comment);
  }
}

module.exports = new CommentService();
