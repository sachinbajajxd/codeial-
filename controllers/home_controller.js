module.exports.home = function(req,res){
    return res.end('<h1>Express is up for Codeial</h1>');
}

//module.exports.actionName = function(req,res){}

//practice

module.exports.practice = function(req,res){
    return res.end('<h1>Lets Practice </h1>');
}

//about

module.exports.about = function(req,res){
    return res.end('<h1>About Section</h1>');
}