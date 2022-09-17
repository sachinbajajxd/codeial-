//importing the model
const User = require('../models/user');

module.exports.profile = function(req,res){

    // return res.end('<h1>Users Profile</h1>');
    return res.render('user_profile',{
        title:'Home'
    });

};

// Assignment
// module.exports.about = function(req,res){

//     return res.end('<h1>About us</h1>')

// }

module.exports.sign_up = function(req,res){
    return res.render('sign-up',{
        title: 'Sign Up'
    });
};

module.exports.sign_in = function(req,res){
    return res.render('sign-in',{
        title: 'Sign In'
    });
};

//get the signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){


        if(err){
            console.log('Error in finding the user in Sign Up');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating the user while signing up');
                    return;
                }

                return res.redirect('/users/sign-in');

            });
        }else{
            return res.redirect('back');
        }
    });

    console.log(req.body);



};

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    //TODO
};