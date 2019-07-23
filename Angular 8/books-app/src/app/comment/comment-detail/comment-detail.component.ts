import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../_models/comment';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {
  @Input() comment: Comment;
  constructor() {}

  ngOnInit() {}
}
