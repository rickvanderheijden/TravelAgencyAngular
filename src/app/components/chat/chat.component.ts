import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {TravelGroup} from '../../../models/travelGroup';
import {ChatService} from '../../services/chat.service';
import {Message} from '../../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() user: User;
  @Input() travelGroup: TravelGroup;

  loading = false;
  messages: Message[];
  message: Message = new Message();

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.loading = true;
    this.chatService.getByTravelGroup(this.travelGroup.id).subscribe(
      (response: any) => {
        this.messages = response;
        this.loading = false; 
      }
    )
  }

  sendMessage() {
    this.message.userFrom = this.user.id
    this.message.travelGroupTo = this.travelGroup.id;
    this.message.userTo = null;

    this.chatService.createMessage(this.message).subscribe(response => this.messages.push(new Message(response)));
    this.message = new Message();
  }
}
