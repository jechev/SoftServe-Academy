import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { BooksComponent } from './books/books.component';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, AlertifyService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
