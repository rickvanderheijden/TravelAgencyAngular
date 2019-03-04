import {Optional} from '@angular/core';

export class Country {

  private _name?: string;
  private _continent?: string;
  private _cities?: [string];


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

  get cities(): [string] {
    return this._cities;
  }

  set cities(value: [string]) {
    this._cities = value;
  }
}
