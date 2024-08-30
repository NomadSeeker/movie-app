const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, require: true},
    release_date: {type: String, require: true},
    genre: {type: String, require: true},
    userId: {type: mongoose.Types.ObjectId, require: true, ref: 'User'}
});

module.exports = mongoose.model('Movie', movieSchema);
