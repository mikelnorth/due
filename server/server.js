require('dotenv').config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require('passport-auth0');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    console.log("Connected to DB")
    app.set('db', db)
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        //db calls will be used here, and create users in our database

        const db = app.get('db')
        
        //find and add users here

        console.log(profile)
        db.users_find_user([profile._json.email]).then(user => {
            if (user[0]){
                return done(null, user[0].user_id)
            }
            else {
                db.users_create_user([profile._json.name, profile._json.email, profile._json.picture])
                .then( user => {
                    return done(null, user[0].user_id)
                })
            }
            console.log(user)
        })

    }
))

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))

app.get("/auth/me", (req,res) => {
    if(!req.user){
        return res.status(200).send(false)
    }

    return res.status(200).send(req.user)
})

app.get("/auth/logout", (req, res) => {
    req.logout()
    res.redirect(302, "http://localhost:3000/#/")
})

passport.serializeUser(function (user_id, done) {
    done(null, user_id)
})

passport.deserializeUser( function (user_id, done) {
    //deserialize here
    app.get('db').users_find_current_user([user_id])
    .then( user => {
        done(null, user[0])
    })
    // done(null, user_id)
})



const PORT = 3005;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))