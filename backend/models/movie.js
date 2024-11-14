const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, require: true},
    movieId: {type: Number, require: true},
    userId: {type: mongoose.Types.ObjectId, require: true, ref: 'User'},
    poster_path: {type: String, require: true}
});

module.exports = mongoose.model('Movie', movieSchema);
