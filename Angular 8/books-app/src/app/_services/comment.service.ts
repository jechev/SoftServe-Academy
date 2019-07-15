import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export class CommentService {
  private baseUrl = 'http://localhost:3000/comments';
  constructor() {}

  addComment(comment) {
    return axios.post(this.baseUrl, comment);
  }
}
