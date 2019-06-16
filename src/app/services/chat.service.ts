import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {ChatMessage} from '../../models/chatMessage';
import {TravelGroup} from '../../models/travelGroup';
import {Booking} from '../../models/booking';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get all message to travelgroup
   * @param emailAddress
   */
  getByTravelGroup(id): Observable<Array<ChatMessage>> {
    return this.http.get(environment.server + '/messages/travelgroup/' + id).pipe(
      map((response: Array<any>) => {
        const messages: Array<ChatMessage> = [];
        response.forEach(function (message, index) {
          messages.push(new ChatMessage(message));
        });
        return messages;
      }),
      catchError(err => {
        swal('getMessages', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  /**
   * Get all messages from user
   */
  getByUser(id): Observable<Array<ChatMessage>> {
    return this.http.get(environment.server + '/messages/userfrom/' + id).pipe(
      map((response: Array<any>) => {
        const messages: Array<ChatMessage> = [];
        response.forEach(function (message, index) {
          messages.push(new ChatMessage(message));
        });
        return messages;
      }),
      catchError(err => {
        swal('getMessages', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  /**
   * Get all messages to user
   * @param id
   */
  getToUser(id): Observable<Array<ChatMessage>> {
    return this.http.get(environment.server + '/messages/userto/' + id).pipe(
      map((response: Array<any>) => {
        const messages: Array<ChatMessage> = [];
        response.forEach(function (message, index) {
          messages.push(new ChatMessage(message));
        });
        return messages;
      }),
      catchError(err => {
        swal('getMessages', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  /**
   * Send message
   * @param Message
   */
  createMessage(message: ChatMessage) {
    return this.http.post(environment.server + '/messages/message', message).pipe(
      map(response => {
        return new ChatMessage(message);
      }),
      catchError(error => {
        swal('createMessage', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }
}

