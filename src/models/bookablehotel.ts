import {Address} from './Address';

export class BookableHotel {

  public id?: number;
  public name: String;
  public description: String;
  public price: number;
  public imageBlob: String;
  public address: Address;
  public originalHotelId: number;
  public amount: number;
  public startDate: Date;
  public endDate: Date;

  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.name = model.name;
      this.description = model.description;
      this.price = model.price;
      this.imageBlob = model.imageBlob;
      this.address = model.address;
      this.originalHotelId = model.originalHotelId;
      this.amount = model.amount;
      this.price = model.price;
      this.startDate = model.startDate;
      this.endDate = model.endDate;
    }
  }
}
