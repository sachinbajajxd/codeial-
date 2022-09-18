
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //find a user and establish a identity
        User.findOne({email: email}, function(err,user){
            if(err){
                console.log('Error in finding user --> passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalide username and password');
                return done(null, false);
            }
            //user authenticated
            return done(null, user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
//serialize->which property is to be sent in the cookie
passport.serializeUser(function(user,done){
    done(null, user.id);
});


//deserializing the user from the key in the cookies
//desrialize->which user is making the request
passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding the user --> passport');
            return done(err);
        }

        return done(null, user);
    });
});

module.exports = passport;

//done takes 2 arguments done(err,isAuthDone)