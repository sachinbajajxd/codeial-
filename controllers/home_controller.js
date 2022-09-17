module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for Codeial</h1>');

    //rendering from ejs
    return res.render('home',{
        title:"Home"
    });

};

//Assignmet

module.exports.signup = function(req,res){
    return res.end('<h1>New User ? Sign up </h1>');
}

//module.exports.actionName = function(req,res){}

