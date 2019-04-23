import {City} from './city';


export class Country {

  private _name?: string;
  private _continent?: string;
  private _cities?: [City];


  constructor(model) {
    this._name = model.name;
    this._continent = model.continent;
    this._cities = model.cities;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get continent(): string {
    return this._continent;
  }

  set continent(value: string) {
    this._continent = value;
  }

  get cities(): [City] {
    return this._cities;
  }

  set cities(value: [City]) {
    this._cities = value;
  }
}
