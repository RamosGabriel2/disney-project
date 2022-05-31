const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    creationDate: String,
    qualification: Number,
    associatedChar: String
});

module.exports = mongoose.model('movies', MovieSchema);