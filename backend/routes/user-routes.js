const express = require('express');
const {check} = require('express-validator');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

// router.get('/allUsers', userControllers.getAllUsers);

router.get('/getAccount/:uid', userControllers.getUserById);

router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').not().isEmpty()
], userControllers.signUp);

router.post('/login', userControllers.logIn);



module.exports = router;