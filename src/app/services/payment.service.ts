import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Payment} from '../../models/Payment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }


  /**
   * Create a payment
   * @param payment
   */
  createPayment(payment: Payment) {
    return this.http.post(environment.server + '/payments', payment).pipe(
      map(response => {
        return new Payment(response);
      }),
      catchError(error => {
        swal('createPayment', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   *get Payments by Token
   */
  getPaymentsByToken() {
    return this.http.get(environment.url + '/payments/token').pipe(
      map( response => {
        console.log(response);
      })
    );
  }
}
