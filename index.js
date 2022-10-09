const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;
//Layouts 
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser()); 

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//view engine
app.set('view engine','ejs');  
// app.set('views',path.join('views',__dirname));
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(
    session({
    name: 'Codeial',
    //TODO ->change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            // mongooseConnection: db,
            mongoUrl:'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//importing routes from ./routes/index.js
//Now for every request it will go in routes folder
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in runnig the server : ${err}`);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
})