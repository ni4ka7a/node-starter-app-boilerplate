class GenericManager {
    constructor(model) {
        this.model = model;
    }

    // TODO: implement filtres
    async getItems() {
        return this.model.find({});
    }

    async getItem(id) {
        return this.model.find({ _id: id });
    }

    async addItem(itemPayload) {
        const item = new this.model({
            ...itemPayload
        });

        await item.save();
    }

    async updateItem(id, update) {
        return this.model.updateOne({ _id: id }, update);
    }

    async deleteItem(id) {
        return this.model.deleteOne({ _id: id });
    }
}

module.exports = GenericManager;