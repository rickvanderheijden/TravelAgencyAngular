import {Component, Input, OnInit} from '@angular/core';
import {TravelGroup} from '../../../models/travelGroup';
import {User} from '../../../models/user';
import {TravelGroupService} from '../../services/travelgroup.service';

import {MessagingService} from '../../services/messaging.service';
import {StompState} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {UserService} from '../../services/user.service';

const WEBSOCKET_URL = 'ws://localhost:9000/socket';
const EXAMPLE_URL = '/topic/server-broadcaster';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  @Input() travelGroup: TravelGroup;

  users: User[];
  loading = false;
  private messagingService: MessagingService;

  messageHistory = [];
  state = 'NOT CONNECTED';

  constructor(private travelGroupService: TravelGroupService, private userService: UserService) {
    this.messagingService = new MessagingService(WEBSOCKET_URL, EXAMPLE_URL);
    // Subscribe to its stream (to listen on messages)
    this.messagingService.stream().subscribe((message: Message) => {
      this.messageHistory.unshift(message.body);
      console.log(message);
    });

    // Subscribe to its state (to know its connected or not)
    this.messagingService.state().subscribe((state: StompState) => {
      this.state = StompState[state];
    });
  }

  ngOnInit() {
    this.loading = true;
    this.travelGroupService.getUsers(this.travelGroup.id).subscribe(
      (response: any) => {
        this.users = response;
        this.loading = false;
      }
    )
  }

  sendAction() {
    console.log('Sending message');
    this.userService.sendMessage('hoi').subscribe(response => {
      console.log(response);
    });
    this.messagingService.send('/server-receiver', {
      text: 'This is cool',
      text2: 'I\'m so happy!'
    });
  }

}
