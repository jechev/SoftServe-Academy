import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { Book } from '../../_models/book';
@Component({
  selector: 'app-book-by-user',
  templateUrl: './book-by-user.component.html',
  styleUrls: ['./book-by-user.component.scss']
})
export class BookByUserComponent implements OnInit {
  books: Book[];
  userId = sessionStorage.getItem('userId');
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBookByUser(this.userId).then(res => {
      this.books = res.data;
      console.log(this.books);
    });
  }
}
