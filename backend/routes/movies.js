const express = require('express');
const {check} = require('express-validator');

const moviesController = require('../controllers/movies-controller');

const router = express.Router();



//get all movies from the user
router.get('/favoriteMovies/:uid', moviesController.getMoviesByUserId);

//save a movie to the user's favorites
router.post('/saveFavoriteMovie', [
    check('title').not().isEmpty(),
    check('movieId').not().isEmpty(),
    check('poster_path').not().isEmpty(),
    check('userId').not().isEmpty()
], moviesController.saveMovie);

router.delete('/deleteFavoriteMovie/:mid', moviesController.deleteFavoriteMovie);

module.exports = router;

