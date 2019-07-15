import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../_services/comment.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  comment: any = {};
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  addComment() {
    this.comment.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.comment.userId = Number(sessionStorage.getItem('userId'));
    this.comment.author = sessionStorage.getItem('email');
    this.comment.postDate = Date.now();
    console.log(this.comment.text);
    this.commentService
      .addComment(this.comment)
      .then(() => {
        this.alertifyService.success('You added a new comment');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
