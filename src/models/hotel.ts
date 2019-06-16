import {Address} from './Address';

export class Hotel {

  public id?: number;
  public name: String;
  public description: String;
  public price: number;
  public imageBlob: String;
  public address: Address;
  public availableFrom: Date;
  public availableTo: Date;
  public numberOfGuests: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.price = model.price;
      this.imageBlob = model.imageBlob;
      this.address = model.address;
      this.availableFrom = new Date(model.availableFrom);
      this.availableTo = new Date(model.availableTo);
      this.numberOfGuests = model.numberOfGuests;
    } else {
      this.address = new Address()
    }
  }
}
