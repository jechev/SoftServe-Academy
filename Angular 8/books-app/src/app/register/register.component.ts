import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  register() {
    this.userService
      .register(this.model.email, this.model.password)
      .then(res => {
        this.alertifyService.success('Registration succesful');
      })
      .catch(err => {
        console.log(err);
        this.alertifyService.error('Register failed! Please try again!');
      });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
