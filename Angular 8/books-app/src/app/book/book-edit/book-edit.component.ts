import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  book: any = {};
  genres: string[] = [
    'Fantasy',
    'Science fiction',
    'Western',
    'Romance',
    'Thriller',
    'Mystery',
    'Detective story',
    'Dystopia',
    'Memoir',
    'Biography',
    'Play',
    'Musical',
    'Satire',
    'Haiku',
    'Horror',
    'DIY (Do It Yourself)',
    'Dictionary'
  ];
  constructor(
    private bookService: BookService,
    private router: Router,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  editBook() {
    this.bookService
      .editBook(this.book.id, this.book)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.book.id = this.route.snapshot.paramMap.get('id');
    this.bookService
      .getBookById(this.book.id)
      .then(res => {
        this.book = res.data;
        console.log(this.book);
      })
      .catch(err => console.log(err));
  }
}