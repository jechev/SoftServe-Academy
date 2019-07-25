import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // If user is logged then redirect to /books and can't show home page
    if (this.userService.isAuth()) {
      this.router.navigate(['/books']);
    }
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(registerMode) {
    this.registerMode = registerMode;
  }
}
