const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');

const cookieParser = require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);
const port=8000;
//Layouts 
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log('Chat server is listening on port 5000');
//
const path = require('path');

if(env.name=='development'){
    app.use(sassMiddleware({
        // src: './assets/scss',
        // dest: './assets/css',
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}


app.use(express.urlencoded());

app.use(cookieParser()); 

app.use(express.static(env.asset_path));
//make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

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
    secret: env.session_cookie_key,
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
});

// console.log(process.env);

