export class Authority {
    public id?: number;
    public authorityName?: string;

    constructor(model) {
        if (model !== undefined) {
            this.id = model.id;
            this.authorityName = model.name;
        }
    }
}
