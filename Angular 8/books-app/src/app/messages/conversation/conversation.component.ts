import * as _ from 'lodash';
import { Component, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/_services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  currentUserId = sessionStorage.getItem('userId');
  userAvatar = 'http://placehold.it/50/55C1E7/fff&text=U';
  myAvatar = 'http://placehold.it/50/FA6F57/fff&text=ME';
  otherUser: any;
  allMessages: Message[] = new Array();
  otherUserId: any;
  constructor(
    private route: ActivatedRoute,
    private msgService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.otherUser = this.route.snapshot.paramMap.get('user');
    this.userService
      .getUserDetails(this.otherUser)
      .then(res => {
        this.otherUserId = res.data[0].id;
        return this.msgService.getConversation(
          this.currentUserId,
          this.otherUserId
        );
      })
      .then(res => {
        res.data.forEach(element => {
          this.allMessages.push(element);
        });
        console.log(this.allMessages);
        return this.msgService.getConversation(
          this.otherUserId,
          this.currentUserId
        );
      })
      .then(res => {
        res.data.forEach(element => {
          this.allMessages.push(element);
        });
        this.allMessages = _.orderBy(this.allMessages, 'postDate', 'asc');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
