const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const moviesRoutes = require('./routes/movies');
const userRoutes = require('./routes/user-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/movies', moviesRoutes);

app.use('/api/users', userRoutes);  

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500).json({message: error.message || 'An unknown error ocurred!'});

});

mongoose.connect('mongodb+srv://nomadseeker24:8BJuci8kVJvpAKwH@cluster0.3g2bz.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0').then(() => app.listen(5000)).catch(err => console.log(err));
