export class UserRole {
    public id: number;
    public created_at: Date;
    public updated_at: Date;
    public name?: string;
    public display_name?: string;
    public description?: string;

    constructor(model)
    {
        if (model !== undefined)
        {
            this.id = model.id;
            this.created_at = model.created_at;
            this.updated_at = model.updated_at;
            this.name = model.name;
            this.display_name = model.display_name;
            this.description = model.description;
        }
    }
}
