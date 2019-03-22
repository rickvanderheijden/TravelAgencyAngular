export class Trip{

  public id: number;
  public name?: String;
  public total_price?: number;

  constructor(model)
  {
    if (model !== undefined)
    {
      this.id = model.id;
      this.name = model.name;
      this.total_price = model.total_price;
    }
  }
}
