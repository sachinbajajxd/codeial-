//entry point to all the routes

// main index.js will send request to routes/indexx.js(this file) now routes/index.js will send further routes from here on

//express router module

const express = require('express');

const router = express.Router();

//exported function from controllers folder
const homeController = require('../controllers/home_controller');

// console.log('router loaded');

router.get('/',homeController.home);

router.get('/practice',homeController.practice);

router.get('/about',homeController.about);

module.exports = router;