const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Movie = require('../models/movie');
const User = require('../models/user');

const movies = [
    {
        _id:'1',
        title: 'The Dark Knight',
        release_date: '2008',
        genre: 'Action',
        userId: 'u1'
    }
];

const getMoviesByUserId = async (req, res, next) => {

    const userId = req.params.uid;
    let favoriteMovies;

    try {
        favoriteMovies = await Movie.find({userId: userId});
    }catch(err) {
        return next(new HttpError('Oops this is embarrasing! An error ocurred while retrieving your favorite movies. Error: .'+err, 500));
    } 

    if(!favoriteMovies)
        return next(new HttpError('It seems you do not have favorite movies saved, so sad!', 404));

    res.status(200).json({movies: favoriteMovies}); 
};

const saveMovie = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return next(new HttpError('Invalid movie information, check your input data.', 422));

    const {title, release_date, genre, userId} = req.body;
    let user;
    let newMovie = new Movie({
        title,
        release_date,
        genre,
        userId
    });

    try {
         user = await User.findById(userId);
    }catch(err) {
        return next(new HttpError('Error finding a user with id provided. Error: '+err, 500));
    }

    if(!user)
        return next(new HttpError('Couldn\'t find a user with that id. Error: '+err, 404));

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newMovie.save({session: session});
        user.movies.push(newMovie);
        await user.save({session: session});
        await session.commitTransaction();
    }catch(err) {
        return next(new HttpError('An error ocurred while saving movie to favorites. Error: '+err, 500));
    }

    res.status(201).json({message: 'Movie was added to your favorites'});
};

const deleteFavoriteMovie = async (req, res, next) => {
    const movieId = req.params.mid;

    let foundMovie;

    try {
        foundMovie = await Movie.findById(movieId).populate('userId');
    }catch(err) {
        return next(new HttpError('An error ocurred while retrieving your favorites movies. Error: '+err, 500));
    }

    if(!foundMovie)
        return next(new HttpError('Oops it seems the movie doesn\'t exist in your favorites list.', 404));

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await foundMovie.deleteOne({session: session});
        foundMovie.userId.movies.pull(foundMovie);
        await foundMovie.userId.save({session: session});
        await session.commitTransaction();
    }catch(err) {
        return next(new HttpError('An error ocurred while removing a movie from your favorites. Error: '+err, 500));
    }

    res.status(200).json({message: 'The movie was removed from your favorites, tastes change we understand!'});
}

exports.getMoviesByUserId = getMoviesByUserId;
exports.saveMovie = saveMovie;
exports.deleteFavoriteMovie = deleteFavoriteMovie;