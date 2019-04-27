export class City {
  public id?: number;
  public name?: String;

  constructor(model?) {
    if (model !== undefined) {
      this.id = model.id;
      this.name = model.name;
    }
  }
}
