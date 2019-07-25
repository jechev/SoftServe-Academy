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
  searchList: {}[] = [
    { value: 'title', display: 'Title' },
    { value: 'author', display: 'Author' },
    { value: 'genre', display: 'Genre' }
  ];
  searchValue: string;
  searchType: string;
  page = 1;
  totalItems: number;
  // Default sort is by id
  orderBy = 'id';
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.loadBooks();
  }

  // clear from search and sorting
  resetFilter() {
    this.searchType = undefined;
    this.searchValue = undefined;
    this.page = 1;
    this.orderBy = 'id';
    this.loadBooks();
  }

  loadBooks(form?) {
    // Check if has search then the page is 1.
    if (form) {
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
