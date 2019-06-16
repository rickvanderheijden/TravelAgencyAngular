import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';
import {Payment} from '../../../models/Payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Booking} from '../../../models/booking';
import {PaymentService} from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  @Input()
  booking: Booking;

  @Output()
  paymentOut: EventEmitter<Payment> = new EventEmitter();

  payment: Payment;

  showCreditCardForm = false;
  showPayPalForm = false;
  showBankTransferForm = false;

  creditCardForm: FormGroup;
  paypalForm: FormGroup;
  bankTransferForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService) {
    this.payment = new Payment();
    this.payment.userId = JSON.parse(sessionStorage.getItem('currentUser')).id;

  }

  ngOnInit() {
  }


  selectMethod(event) {
    $('.payment-method').removeClass('active');
    $('.' + event).addClass('active');

    switch (event) {
      case 'creditcard' :
        this.showBankTransferForm = false;
        this.showPayPalForm = false;
        this.showCreditCardForm = true;
        break;
      case 'paypal' :
        this.showBankTransferForm = false;
        this.showPayPalForm = true;
        this.showCreditCardForm = false;
        break;

      case 'bankTransfer' :
        this.showBankTransferForm = true;
        this.showPayPalForm = false;
        this.showCreditCardForm = false;
        break;
      default :
        this.showBankTransferForm = false;
        this.showPayPalForm = false;
        this.showCreditCardForm = false;
    }
  }

  setForms() {
    this.creditCardForm = this.formBuilder.group({
      cardHolder: this.formBuilder.control('', Validators.required),
      cardNumber: this.formBuilder.control('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      cardNumber: this.formBuilder.control('', [Validators.required]),
      ccv: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      amount: this.formBuilder.control({value: this.booking.getTotalPrice(), disabled: true}, Validators.required),
    });
    this.creditCardForm.get('cardNumber').valueChanges.subscribe( value => {
       let newVal = value.replace(/[a-z]+/g, '');
      const length = newVal.length;
      if (length === 4) {newVal = newVal + ' '; }
      if (length === 9) {newVal = newVal + ' '; }
      if (length === 14) {newVal = newVal + ' '; }
      if (length > 19) {newVal = newVal.substring(0, 19); }

      this.creditCardForm.get('cardNumber').setValue(newVal, {emitEvent: false});
    });

    this.paypalForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      amount: this.formBuilder.control({value: this.booking.getTotalPrice(), disabled: true}, Validators.required),
    });
    this.bankTransferForm = this.formBuilder.group({
      amount: this.formBuilder.control( {value: this.booking.getTotalPrice(), disabled: true}, Validators.required),
    });
  }

  doPayment(form: FormGroup) {
    if (this.showCreditCardForm) {
      this.payment.method = 'CREDITCARD';
      this.paymentService.createPayment(this.payment).subscribe((payment: Payment) => {
        this.paymentOut.emit(payment);
      });
    } else if (this.showPayPalForm) {
      this.payment.method = 'PAYPAL';
      this.paymentService.createPayment(this.payment).subscribe((payment: Payment) => {
        this.paymentOut.emit(payment);
      });
    } else {
      this.payment.method = 'BANK_TRANSFER';
      this.paymentOut.emit(this.payment);
    }
  }

  ngAfterViewInit(): void {
    this.payment.bookingId = this.booking.id;
    this.payment.amount = this.booking.getTotalPrice();
    this.setForms();
  }
}
