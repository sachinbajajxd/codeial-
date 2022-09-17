//Assignment

const express = require('express');

const router = express.Router();

const detailsController = require('../controllers/details_controllers');

router.get('/details',detailsController.details);



module.exports = router;