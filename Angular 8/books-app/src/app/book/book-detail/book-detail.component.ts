import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../_services/book.service';

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
    private bookService: BookService
  ) {}

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
