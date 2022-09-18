const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controllers');

router.get('/profile',usersController.profile);

// router.get('/about',usersController.about);

router.get('/sign-up',usersController.sign_up);

router.get('/sign-in',usersController.sign_in);

router.post('/create',usersController.create);

router.post('/create-session',usersController.createSession);

router.get('/signout',usersController.deleteCookie);

module.exports = router;