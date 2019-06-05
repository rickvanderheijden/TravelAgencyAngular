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
  public minimumNumberOfAttendees: number;
  public maximumNumberOfAttendees: number;
  public numberOfAttendees: number;

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
      this.minimumNumberOfAttendees = model.minimumNumberOfAttendees;
      this.maximumNumberOfAttendees = model.maximumNumberOfAttendees;
      this.numberOfAttendees = model.numberOfAttendees;
    } else {
      this.date = new Date();
      this.address = new Address();
    }
  }
}
