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
  searchList = [
    { value: 'title', display: 'Title' },
    { value: 'author', display: 'Author' },
    { value: 'genre', display: 'Genre' }
  ];
  searchValue;
  searchType;
  page = 1;
  totalItems;
  // Default sort by id
  orderBy = 'id';
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.loadBooks();
  }

  resetFilter() {
    this.searchType = undefined;
    this.searchValue = undefined;
    this.loadBooks();
  }

  loadBooks() {
    // Check if has search options
    if (this.searchValue && this.searchType) {
      this.page = 1;
    }
    this.bookService
      .getAllBooksWithCreator(
        this.page,
        this.orderBy,
        this.searchValue,
        this.searchType
      )
      .then(res => {
        this.totalItems = res.headers['x-total-count'];
        this.books = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
