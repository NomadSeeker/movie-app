const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const moviesRoutes = require('./routes/movies');
const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');

dotenv.config();
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

mongoose.connect(process.env.DB_URL).then(() => app.listen(parseInt(process.env.PORT))).catch(err => console.log(err));
