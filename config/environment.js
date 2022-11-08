const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const { gzip } = require('zlib');

const logDirectory=path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development={
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'google',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sachinBajajCodeial@gmail.com',
            pass: 'lzzwutryokmlumgv'
        },
    },
    google_client_id: "565825080059-89skc0gjass2e1bi026lnh3s9jphha5a.apps.googleusercontent.com",
    google_client_secret: "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" ,
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production={
    name:'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'google',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        },
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET ,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports=eval(process.env.NODE_ENV)==undefined ? development : eval(process.env.NODE_ENV);

// module.exports=development;