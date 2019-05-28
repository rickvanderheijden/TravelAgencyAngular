import {Address} from './Address';


export class TripItem {
  public id?: number;
  public tripItemType?: String;
  public name?: String;
  public description?: String;
  public imageBlob?: string | ArrayBuffer;
  public address?: Address;
  public price?: number;
  public date?: Date;
  public minPersons: number;
  public maxPersons: number;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.tripItemType = model.tripItemType;
      this.address = new Address(model.address);
      this.price = model.price;
      this.date = new Date(model.date);
      this.imageBlob = model.imageBlob;
      this.minPersons = model.minPersons;
      this.maxPersons = model.maxPersons;
    } else {
      this.date = new Date();
      this.address = new Address();
    }
  }
}
