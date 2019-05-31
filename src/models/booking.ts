import {Trip} from './trip';
import {BookableHotel} from './bookablehotel';
import {BookableTripItem} from './bookabletripitem';

export class Booking {

  public id: number;
  public numberOfTravelers: number;
  public trip: Trip;
  public hotels: BookableHotel[];
  public tripItems: BookableTripItem[];
  private totalPrice: number;
  public startDate: Date;
  public endDate: Date;
  public booked: boolean;
  public paid: boolean;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.numberOfTravelers = model.numberOfTravelers;
      this.trip = model.trip;
      this.hotels = model.hotels;
      this.tripItems = model.tripItems;
      this.totalPrice = model.totalPrice;
      this.startDate = model.startDate;
      this.endDate = model.endDate;
      this.booked = model.booked;
      this.paid = model.paid;
    } else {
      this.numberOfTravelers = 4;
      this.tripItems = new Array();
      this.hotels = new Array();
    }
  }

  getTotalPrice() {
    let totalPriceBooking = this.numberOfTravelers * this.trip.totalPrice;

    if (this.tripItems !== null) {
      this.tripItems.forEach(function (tripItem) {
        totalPriceBooking += tripItem.amount * tripItem.price;
      });
    }

    if (this.hotels !== null) {
      this.hotels.forEach(function (hotel) {
        totalPriceBooking += hotel.amount * hotel.price;
      });
    }

    return totalPriceBooking;
  }

  // public addTripItem(tripItem: TripItem) {
  //   if (typeof tripItem !== 'undefined') {
  //     if (this.tripItems.indexOf(tripItem) === -1) {
  //       this.tripItems.push(tripItem);
  //       this.totalPrice = this.totalPrice + tripItem.price;
  //     }
  //   }
  // }
  //
  // public removeTripItem(tripItem: TripItem) {
  //   if ( tripItem !== undefined) {
  //     if (this.tripItems.indexOf(tripItem) !== -1) {
  //       this.tripItems.splice(this.tripItems.indexOf(tripItem), 1);
  //       this.totalPrice = this.totalPrice - tripItem.price;
  //     }
  //   }
  // }
}
