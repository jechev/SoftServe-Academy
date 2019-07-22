import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  authors: any;
  constructor(private bookService: BookService) {}

  ngOnInit() {
    // this.bookService
    //   .getAllBooksWithCreator()
    //   .then(res => {
    //     this.authors = [...new Set(res.data.map(item => item.author))];
    //     console.log(this.authors);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
}
