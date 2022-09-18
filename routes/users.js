const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controllers');

router.get('/profile',usersController.profile);

// router.get('/about',usersController.about);

router.get('/sign-up',usersController.sign_up);

router.get('/sign-in',usersController.sign_in);

router.post('/create',usersController.create);

//use passport as a middleweare to authenticate
router.post('/create-session', passport.authenticate(
    'local',
     {failureRedirect: '/users/sign-in'}
     ),usersController.createSession);

module.exports = router;