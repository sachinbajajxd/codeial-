const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;
//Layouts 
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



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