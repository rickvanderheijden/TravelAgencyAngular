import {TripItem} from './TripItem';
import {Trip} from './trip';
import {Hotel} from './hotel';

export class Travel {

  public id: number;
  public trip: Trip;
  public hotels: Hotel[] = new Array();
  public tripItems: TripItem[] = new Array();
  public totalPrice: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.trip = model.trip;
      this.hotels = model.hotels;
      this.tripItems = model.tripItems;
      this.totalPrice = model.totalPrice;
    }
  }

  public addTripItem(tripItem: TripItem) {
    if (typeof tripItem !== 'undefined') {
      if (this.tripItems.indexOf(tripItem) === -1) {
        this.tripItems.push(tripItem);
        this.totalPrice = this.totalPrice + tripItem.price;
      }
    }
  }

  public removeTripItem(tripItem: TripItem) {
    if ( tripItem !== undefined) {
      if (this.tripItems.indexOf(tripItem) !== -1) {
        this.tripItems.splice(this.tripItems.indexOf(tripItem), 1);
        this.totalPrice = this.totalPrice - tripItem.price;
      }
    }
  }

  public addHotel(hotel: Hotel) {
    if (typeof hotel !== 'undefined') {
      if (this.hotels.indexOf(hotel) === -1) {
        this.hotels.push(hotel);
        this.totalPrice = this.totalPrice + hotel.price;
      }
    }
  }

  public removeHotel(hotel: Hotel) {
    if (hotel !== undefined) {
      if (this.hotels.indexOf(hotel) !== -1) {
        this.hotels.splice(this.hotels.indexOf(hotel), 1);
        this.totalPrice = this.totalPrice - hotel.price;
      }
    }
  }
}
