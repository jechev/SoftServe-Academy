import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BsDropdownModule,
  PaginationModule,
  ButtonsModule
} from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';

import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BookByUserComponent } from './book/book-by-user/book-by-user.component';

import { AddCommentComponent } from './comment/add-comment/add-comment.component';
import { CommentDetailComponent } from './comment/comment-detail/comment-detail.component';

import { MessageSendComponent } from './messages/message-send/message-send.component';
import { InboxComponent } from './messages/inbox/inbox.component';
import { ConversationComponent } from './messages/conversation/conversation.component';

import { UserService } from './_services/user.service';
import { BookService } from './_services/book.service';
import { CommentService } from './_services/comment.service';
import { AlertifyService } from './_services/alertify.service';

import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    BookListComponent,
    BookDetailComponent,
    AddCommentComponent,
    CommentDetailComponent,
    AddBookComponent,
    BookEditComponent,
    BookByUserComponent,
    AuthorComponent,
    MessageSendComponent,
    InboxComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    MatSelectModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    UserService,
    BookService,
    CommentService,
    AlertifyService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
