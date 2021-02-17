const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    category: String,
    price: Number
});

module.exports = mongoose.model('item', itemSchema, 'items');