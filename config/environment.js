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
    jwt_secret: 'codeial'
}

const production={
    name:'production'
}

module.exports=development;