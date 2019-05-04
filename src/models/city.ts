export class City {
  public id?: number;
  public name?: String;

  constructor(model?) {
    if (model !== null) {
      this.id = model.id;
      this.name = model.name;
    }
  }
}
