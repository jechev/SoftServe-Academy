import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  curentUserId;
  allMessages: any[] = new Array();
  subjects: any;
  constructor(private msgService: MessageService) {}

  ngOnInit() {
    this.curentUserId = sessionStorage.getItem('userId');
  }
}
