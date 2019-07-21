import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { Book } from '../../_models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  page = 1;
  totalItems;
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.loadBooks();
  }

  loadBooks() {
    this.bookService
      .getAllBooksWithCreator(this.page)
      .then(res => {
        console.log(res.headers['x-total-count']);
        this.totalItems = res.headers['x-total-count'];
        this.books = res.data;
        console.log(this.books);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
