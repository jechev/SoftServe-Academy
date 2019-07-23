import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/_services/message.service';
import { UserService } from 'src/app/_services/user.service';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.scss']
})
export class MessageSendComponent implements OnInit {
  @Input() partner: any;
  users: any[] = new Array();
  recipient = { id: null, email: null };
  msgText: string;
  newMessage: Message = new Message();
  constructor(
    private msgService: MessageService,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.partner) {
      this.userService.getUserDetails(this.partner).then(res => {
        console.log(res.data[0]);
        this.recipient.id = res.data[0].id;
        this.recipient.email = this.partner;
      });
    } else {
      this.userService
        .getAllUsers()
        .then(res => {
          res.data.forEach(element => {
            if (element.id !== Number(sessionStorage.getItem('userId'))) {
              this.users.push(element);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    console.log(this.partner);
  }

  sendMessage() {
    this.newMessage.sender = sessionStorage.getItem('email');
    this.newMessage.senderId = Number(sessionStorage.getItem('userId'));
    this.newMessage.content = this.msgText;
    this.newMessage.recipient = this.recipient.email;
    this.newMessage.recipientId = this.recipient.id;
    this.newMessage.postDate = Date.now();

    this.msgService
      .sendMessage(this.newMessage)
      .then(res => {
        this.alertifyService.success(
          'You send message to ' + this.recipient.email
        );
        this.router.navigate(['/conversation/' + this.recipient.email]);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
