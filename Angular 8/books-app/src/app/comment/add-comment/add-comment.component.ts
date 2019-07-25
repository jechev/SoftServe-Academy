import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../_services/comment.service';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { Comment } from 'src/app/_models/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  // Send new comment to parent (book-detail) element
  @Output() sendNewComment = new EventEmitter();
  comment: Comment = new Comment();
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.comment.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.comment.userId = Number(sessionStorage.getItem('userId'));
    this.comment.author = sessionStorage.getItem('email');
    this.comment.postDate = new Date(Date.now());
    this.commentService
      .addComment(this.comment)
      .then(res => {
        this.sendNewComment.emit(res.data);
        this.alertifyService.success('You added a new comment');
        form.resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
