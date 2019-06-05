import {Country} from './country';


export class Continent {

  public id?: number;
  public name?: string;
  public countries?: Country[];


  constructor(model?) {
    if (typeof model !== typeof undefined) {
      this.id = model.id;
      this.name = model.name;
      this.countries = model.countries;
    }
  }

}
