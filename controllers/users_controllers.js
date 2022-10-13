//importing the model
const User = require('../models/user');

module.exports.profile = function(req,res){

    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user: user
        });

    });


};

module.exports.update = function(req,res){
    
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success', 'Updated!');
            return res.redirect('back');
        });
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unautorized');
    }


}


module.exports.sign_up = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign-up',{
        title: 'Sign Up'
    });
};

module.exports.sign_in = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign-in',{
        title: 'Sign In'
    });
};

//get the signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){


        // if(err){
        //     console.log('Error in finding the user in Sign Up');
        //     return;
        // }
        if(err){req.flash('error', err); return}

        if(!user){
            User.create(req.body, function(err, user){
                // if(err){
                //     console.log('Error in creating the user while signing up');
                //     return;
                // }
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');

            });
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });

    console.log(req.body);



};

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
};

module.exports.deleteSession = function(req,res){
    //by passport js logout()
    req.logout(function(err){
        if(err){
            return console.log(err);
        }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
};