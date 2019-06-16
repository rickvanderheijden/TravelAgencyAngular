import {BookingItem} from './bookingitem';
import {Travel} from './travel';
import {User} from './user';
import {Address} from './Address';
import {Payment} from './Payment';
import {Traveler} from './traveler';

export class Booking {

  public id: number;
  public tripId: number;
  public basePrice: number;
  public totalPrice: number;
  public booker: User;
  public address: Address;
  public numberOfTravelers: number;
  public travelers: Traveler[];
  public bookingItems: BookingItem[];
  public payments: Payment[];
  public booked: boolean;
  public paid: boolean;
  public bookingDate: Date;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.tripId = model.tripId;
      this.basePrice = model.basePrice;
      this.totalPrice = model.totalPrice;
      this.booker = model.booker;
      this.address = model.address;
      this.numberOfTravelers = model.numberOfTravelers;
      this.travelers = model.travelers;
      this.bookingItems = model.bookingItems;
      this.payments = model.payments;
      this.booked = model.booked;
      this.paid = model.paid;
      this.bookingDate = model.bookingDate;
    } else {
      this.address = new Address();
      this.bookingDate = new Date();
      this.travelers = [];
    }
  }

  setPropertiesFromTravel(travel: Travel) {
    this.bookingItems = new Array();
    this.tripId = travel.trip.id;
    this.basePrice = travel.trip.totalPrice;

    const bookingItemsToAdd = new Array<BookingItem>();

    travel.tripItems.forEach((tripItem) => {
      const bookingItem = new BookingItem();
      bookingItem.bookingItemType = 'TRIPITEM';
      bookingItem.itemId = tripItem.id;
      bookingItem.name = tripItem.name;
      bookingItem.description = tripItem.description;
      bookingItem.price = tripItem.price;
      bookingItem.numberOfAttendees = this.numberOfTravelers;
      bookingItemsToAdd.push(bookingItem);
    });

    travel.hotels.forEach((hotel) => {
      const bookingItem = new BookingItem();
      bookingItem.bookingItemType = 'HOTEL';
      bookingItem.itemId = hotel.id;
      bookingItem.name = hotel.name;
      bookingItem.description = hotel.description;
      bookingItem.price = hotel.price;
      bookingItem.numberOfAttendees = this.numberOfTravelers;
      bookingItemsToAdd.push(bookingItem);
    });

    this.bookingItems = bookingItemsToAdd;
  }

  getTotalPrice() {
    let totalPriceBooking = this.numberOfTravelers * this.basePrice;

    if (this.bookingItems !== null) {
      this.bookingItems.forEach(function (bookingItem) {
        totalPriceBooking += bookingItem.numberOfAttendees * bookingItem.price;
      });
    }

    return totalPriceBooking;
  }
  addTraveler(traveler: Traveler) {
    this.travelers.push(traveler);
  }
  setTravelers(travelers: Traveler[]) {
    this.travelers = travelers;
}}
