const mongoose = require('mongoose');
const {validationResult} = require('express-validator');


const User = require('../models/user');
const HttpError = require('../models/http-error');

const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    let existingUser;
    const {name, email, password} = req.body;

    let newUser = new User({
        name,
        email,
        password,
        movies: [],
    });

    try{
        existingUser = await User.findOne({email: email});
    }catch(err) {
        return next(new HttpError('An error ocurred while signing up. Error: '+err, 500));
    }

    if(existingUser)
        return next(new HttpError('A user already exists with that email. Try logging in.', 422));

    try {
        await newUser.save();
    }catch(err) {   
        return next(new HttpError('An error ocurred while creating the user. Error: '+err, 500));
    }

    res.status(200).json({user: newUser.toObject({getters: true}), message: 'Account successfully created, Please Log in!'});
};

const logIn = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email: email});
    }catch(err) {
        return next(new HttpError('An error ocurred while logging in. Error: '+err, 500));
    }

    if(!existingUser || existingUser.password !== password)
        return next(new HttpError('No user was found with that email. Please sign up.', 404));

    res.json({user: existingUser.toObject({getters: true}),message: 'User logged in'});

};

const getUserById = async (req, res, next)  => {
    const id = req.params.uid;

    let foundUser;

    try {
        foundUser = await User.findOne({_id: id});
    }catch(err) {
        return next(new HttpError('An error ocurred while retreiving the account. Error: '+err, 500));
    }

    if(!foundUser) {
        return next(new HttpError('No account was found.', 500));
    }

    res.status(200).json({user: foundUser.toObject({getters: true})});
}

exports.signUp = signUp;
exports.logIn = logIn;
exports.getUserById = getUserById;