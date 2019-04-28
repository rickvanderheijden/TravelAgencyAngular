import {TripItem} from './TripItem';
import {Trip} from './trip';

export class Travel {

  public id: number;
  public trip: Trip;
  public tripItems: TripItem[];
  public totalPrice: number;
  public booked: boolean;
  public paid: boolean;

  constructor(model?) {
    if (model !== undefined) {
      this.id = model.id;
      this.trip = model.trip;
      this.tripItems = model.tripItems;
      this.totalPrice = model.totalPrice;
      this.booked = model.booked;
      this.paid = model.paid;
    } else {
      this.tripItems = new Array();
    }
  }

  public addTripItem(tripItem: TripItem) {
    if ( tripItem !== undefined) {
      if (this.tripItems.indexOf(tripItem) === -1) {
        this.tripItems.push(tripItem);
      }
    }
  }

  public removeTripItem(tripItem: TripItem) {
    if ( tripItem !== undefined) {
      if (this.tripItems.indexOf(tripItem) !== -1) {
        this.tripItems.splice(this.tripItems.indexOf(tripItem), 1);
      }
    }
  }
}
