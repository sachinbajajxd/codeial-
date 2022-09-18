//importing the model
const User = require('../models/user');

module.exports.profile = function(req,res){

    if(req.cookies.user_id){

        User.findById(req.cookies.user_id, function(err,user){

            if(user){


                return res.render('user_profile',{
                    title: "User Profile",
                    user: user

                });


            }else{
                return res.redirect('/users/sign-in');
            }

        });


    }else{
        return res.redirect('/users/sign-in');
    }
    

};

module.exports.deleteCookie = function(req,res){

    res.cookie('user_id',"")
    return res.redirect('/users/sign-in');

};


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

    // steps to authenticate
    // find the user
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding the user signing in');
            return;
        }
        
        //handle user found
        if(user){

            //handle password which dont match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');


        }else{

            //handle user not found
            return res.redirect('back');
        }
    });

    
    


};