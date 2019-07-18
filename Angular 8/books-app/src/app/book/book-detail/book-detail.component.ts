import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../_services/book.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: any;
  currentUserId;

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

  addNewComment($event) {
    this.book.comments.push($event);
  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.currentUserId = Number(sessionStorage.getItem('userId'));
    this.bookService
      .getBookById(bookId)
      .then(res => {
        this.book = res.data;
        console.log(this.book);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
