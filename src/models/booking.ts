import {Trip} from './trip';
import {BookableHotel} from './bookablehotel';
import {BookableTripItem} from './bookabletripitem';

export class Booking {

  public id: number;
  public numberOfTravelers: number;
  public trip: Trip;
  public hotels: BookableHotel[];
  public tripItems: BookableTripItem[];
  public totalPrice: number;
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
      this.numberOfTravelers = 2;
      this.tripItems = new Array();
      this.hotels = new Array();
    }
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
