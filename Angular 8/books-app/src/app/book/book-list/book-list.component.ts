import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any[];
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService
      .getAllBooksWithCreator()
      .then(res => {
        this.books = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
