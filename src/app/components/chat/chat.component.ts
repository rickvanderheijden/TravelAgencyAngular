import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {TravelGroup} from '../../../models/travelGroup';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() user: User;
  @Input() travelGroup: TravelGroup;

  constructor() { }

  ngOnInit() {
  }

}
