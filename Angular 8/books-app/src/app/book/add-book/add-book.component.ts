import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  book: Book = new Book();

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
    private alertifyService: AlertifyService
  ) {}

  addBook(form) {
    if (form.invalid) {
      return;
    }
    this.book.userId = Number(sessionStorage.getItem('userId'));
    this.bookService
      .addBook(this.book)
      .then(res => {
        const newBookId = res.data.id;
        this.alertifyService.success('You added new book');
        this.router.navigate(['/book/' + newBookId]);
      })
      .catch(err => console.log(err));
  }
  ngOnInit() {}
}
