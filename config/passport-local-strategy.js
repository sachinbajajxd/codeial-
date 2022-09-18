
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

//check if the user is authenticated
//we will be using this func. as a middleware
passport.checkAuthentication = function(req, res, next){

    //if the user is signed in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in

    return res.redirect('/users/sign-in')


}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contians the current signed in user from the session cookie and we are just sending this ti the local for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;

//done takes 2 arguments done(err,isAuthDone)