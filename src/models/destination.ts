import {TripItem} from './TripItem';
import {City} from './city';
import {Hotel} from './hotel';

export class Destination {

  public id?: number;
  public name: String;
  public city: City;
  public hotel: Hotel;
  public tripItems: TripItem[];

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.name = model.name;
      this.city = model.city;
      this.hotel = model.hotel;
      this.tripItems = model.tripItems !== null ? model.tripItems : new Array<TripItem>();
    }
  }

  addTripItem(tripItem: TripItem) {
    if (this.tripItems.indexOf(tripItem) !== -1) {
      this.tripItems.push(tripItem);
    }

  }
}
