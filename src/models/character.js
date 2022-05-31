const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    age: Number,
    weight: Number,
    history: String,
    movie: String
});

module.exports = mongoose.model('characters', CharacterSchema);