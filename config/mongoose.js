const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connceting to mongoDB"));

db.once('open',function(){
    console.log('Connected to database :: mongoDB')
});

module.exports = db;