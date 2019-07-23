import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  curentUserId;
  allUsers: any[] = new Array();
  uniqueUsers: any;
  subjects: any;
  constructor(private msgService: MessageService) {}

  ngOnInit() {
    this.curentUserId = sessionStorage.getItem('userId');
    this.msgService
      .getMessagesForRecepient(this.curentUserId)
      .then(res => {
        res.data.forEach(element => {
          this.allUsers.push(element.sender);
        });
        return this.msgService.getMessagesForSender(this.curentUserId);
      })
      .then(res => {
        res.data.forEach(element => {
          this.allUsers.push(element.recipient);
        });
      })
      .then(() => {
        this.uniqueUsers = _.uniq(this.allUsers);
        console.log(this.uniqueUsers);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
