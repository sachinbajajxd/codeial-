const express=require('express');
const app=express();
const port=8000;

//importing routes from ./routes/index.js
//Now for every request it will go in routes folder
//use express router
app.use('/',require('./routes'));

//view engine
app.set('view engine','ejs');

// app.set('views',path.join('views',__dirname));
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in runnig the server : ${err}`);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
})