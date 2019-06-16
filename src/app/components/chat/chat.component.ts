import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {TravelGroup} from '../../../models/travelGroup';
import {ChatService} from '../../services/chat.service';
import {ChatMessage} from '../../../models/chatMessage';
import {MessagingService} from '../../services/messaging.service';
import { Message } from '@stomp/stompjs';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


const WEBSOCKET_URL = 'ws://localhost:9000/socket';
const EXAMPLE_URL = '/topic/server-broadcaster';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() user: User;
  @Input() travelGroup: TravelGroup;

  chatForm: FormGroup;

  loading = false;
  messages: ChatMessage[];
  chatMessage: ChatMessage = new ChatMessage();
  private messagingService: MessagingService;

  constructor(private chatService: ChatService,  private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.messagingService = new MessagingService(WEBSOCKET_URL, EXAMPLE_URL);
    // Subscribe to its stream (to listen on messages)
    this.messagingService.stream().subscribe((message: Message) => {

      if (message.body.indexOf('{') !== -1) {
        const response: any = JSON.parse(message.body);
        if (response.connected !== typeof undefined) {
          if (response.connected) {
            if (response.userId !== this.user.id) {
              this.toastr.success(response.username + ' is online gekomen');
            }
          } else {
            const chatMessage = new ChatMessage(response);
            this.messages.push(chatMessage);
          }
        }
      }
    });
  }

  ngOnInit() {
    this.loading = true;
    this.chatService.getByTravelGroup(this.travelGroup.id).subscribe(
      (response: any) => {
        this.messages = response;
        this.loading = false;
      }
    );
    this.chatForm = this.formBuilder.group({
      message: this.formBuilder.control('', [Validators.required, Validators.maxLength(200)])
    });
  }

  sendMessage() {
    this.chatMessage.sender = this.user;
    this.chatMessage.travelGroupTo = this.travelGroup.id;
    this.chatMessage.receiverId = null;
    this.chatMessage.message = this.chatForm.get('message').value;

    this.chatService.createMessage(this.chatMessage).subscribe();
    this.chatMessage = new ChatMessage();
    this.chatForm.get('message').setValue('');
  }
}
