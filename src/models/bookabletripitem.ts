import {Address} from './Address';
import {TripItem} from './TripItem';


export class BookableTripItem extends TripItem{
  public id?: number;
  public tripItemType?: String;
  public name?: String;
  public description?: String;
  public imageBlob?: string | ArrayBuffer;
  public address?: Address;
  public date?: Date;
  public price?: number;
  public amount?: number;

  constructor(model?) {
    super();
    this.amount = 1;
  }
}
