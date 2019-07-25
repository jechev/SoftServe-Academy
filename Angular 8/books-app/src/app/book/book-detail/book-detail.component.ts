import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../_services/book.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  currentUserId: number;
  startPage: number;
  paginationLimit: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private alertifyService: AlertifyService
  ) {}

  deleteBook() {
    if (this.currentUserId === this.book.userId) {
      this.alertifyService.confirm('Are you want to delete this book?', () =>
        this.bookService
          .deleteBook(this.book.id)
          .then(() => {
            this.alertifyService.success('You deleted the book');
            this.router.navigate(['/books']);
          })
          .catch(err => {
            console.log(err);
          })
      );
    }
  }
  // method take the new comment from child element.
  addNewComment($event) {
    this.book.comments.unshift($event);
  }

  ngOnInit() {
    this.startPage = 0;
    this.paginationLimit = 3;
    const bookId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = Number(sessionStorage.getItem('userId'));

    this.bookService
      .getBookById(bookId)
      .then(res => {
        this.book = res.data;
        this.book.comments = _.orderBy(this.book.comments, 'postDate', 'desc');
      })
      .catch(err => {
        console.log(err);
      });
  }

  showMoreComments() {
    this.paginationLimit = Number(this.paginationLimit) + 3;
  }
  showLessComments() {
    this.paginationLimit = Number(this.paginationLimit) - 3;
  }
}
