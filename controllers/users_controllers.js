module.exports.profile = function(req,res){

    // return res.end('<h1>Users Profile</h1>');
    return res.render('user_profile',{
        title:"Home"
    });

};

module.exports.about = function(req,res){

    return res.end('<h1>About us</h1>')

}