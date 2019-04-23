export class City {
  public id?: number;
  public name?: String;

  constructor(model?) {
    this.id = model.id;
    this.name = model.name;
  }
}
