const express = require('express');
const {check} = require('express-validator');

const moviesController = require('../controllers/movies-controller');

const router = express.Router();



//get all movies from the user
router.get('/favoriteMovies/:uid', moviesController.getMoviesByUserId);

//save a movie to the user's favorites
router.post('/saveFavoriteMovie', [
    check('title').not().isEmpty(),
    check('release_date').not().isEmpty(),
    check('genre').not().isEmpty()
], moviesController.saveMovie);

router.delete('/deleteFavoriteMovie/:mid', moviesController.deleteFavoriteMovie);

module.exports = router;

