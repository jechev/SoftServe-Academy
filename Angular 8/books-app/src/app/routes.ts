import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BookByUserComponent } from './book/book-by-user/book-by-user.component';
import { AuthorComponent } from './author/author.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'books', component: BookListComponent },
      { path: 'my-books', component: BookByUserComponent },
      { path: 'authors', component: AuthorComponent }
    ]
  },
  {
    path: 'book',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: AddBookComponent },
      { path: ':id/edit', component: BookEditComponent },
      { path: ':id', component: BookDetailComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
