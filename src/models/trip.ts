import {Destination} from './destination';

export class Trip {

  public id?: number;
  public name?: String;
  public description?: String;
  public summary?: String;
  public totalPrice?: number;
  public imageBlob?: String;
  public discount?: number;
  public minimumNumberOfTravelers?: number;
  public maximumNumberOfTravelers?: number;
  public availableFrom: Date;
  public availableTo: Date;
  public destinations?: Destination[];

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.summary = model.summary;
      this.totalPrice = model.totalPrice;
      this.imageBlob = model.imageBlob;
      this.discount = model.discount;
      this.availableFrom = new Date(model.availableFrom);
      this.availableTo = new Date(model.availableTo);
      this.minimumNumberOfTravelers = model.minimumNumberOfTravelers;
      this.maximumNumberOfTravelers = model.maximumNumberOfTravelers;
      this.destinations = model.destinations !== null ? model.destinations : new Array<Destination>();
    }
  }

  addDestination(destination: Destination) {
    if (this.destinations.indexOf(destination) !== -1) {
      this.destinations.push(destination);
    }

  }
}
