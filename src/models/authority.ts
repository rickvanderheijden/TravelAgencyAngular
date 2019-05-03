export class Authority {
    public id?: number;
    public name?: String;

    constructor(model) {
        if (!model) {
            this.id = model.id;
            this.name = model.name;
        }
    }
}
