const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controllers');

router.get('/profile',userController.profile);

router.get('/about',userController.about);

module.exports = router;