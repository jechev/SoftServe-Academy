import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/_services/message.service';
import { UserService } from 'src/app/_services/user.service';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.scss']
})
export class MessageSendComponent implements OnInit {
  users: any[] = new Array();
  recipient;
  msgText: string;
  subject;
  newMessage: Message = new Message();
  constructor(
    private msgService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .getAllUsers()
      .then(res => {
        res.data.forEach(element => {
          if (element.id !== Number(sessionStorage.getItem('userId'))) {
            this.users.push(element);
          }
        });
        console.log(this.users);
      })
      .catch(err => {
        console.log(err);
      });
  }

  sendMessage() {
    this.newMessage.sender = sessionStorage.getItem('email');
    this.newMessage.senderId = Number(sessionStorage.getItem('userId'));
    this.newMessage.content = this.msgText;
    this.newMessage.recipient = this.recipient.email;
    this.newMessage.recipientId = this.recipient.id;

    console.log(this.newMessage);
    console.log(this.msgText);
    this.msgService
      .sendMessage(this.newMessage)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
