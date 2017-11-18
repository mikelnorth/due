require('dotenv').config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require('passport-auth0');

const users_controller = require('./controllers/users_controller')
const schools_controller = require("./controllers/schools_controller")
const classes_controller = require('./controllers/classes_controller');
const calendar_controller = require('./controllers/calendar_controller');
const assignment_controller = require('./controllers/assignment_controller');



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
        return res.status(404).send(false)
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


//ENDPOINTS

//USER
app.get('/api/users/setuser/:user_id', users_controller.setUserOnRedux)

//SCHOOLS
app.post('/api/schools/insert/:school_id/:user_id/:school_name', schools_controller.addSchool);

//CLASSES
app.get('/api/classes/get/:school_id', classes_controller.findClass);
app.post('/api/classes/add/:class_name/:school_id', classes_controller.createClass);
app.get('/api/classes/getbyclassname/:user_id', classes_controller.getClassNamesByUser);

//CALENDARS
app.get('/api/calendars/get/:class_id', calendar_controller.findCalendars);
app.post('/api/calendars/add/:user_id/:class_id', calendar_controller.createCalendar);
app.get('/api/calendars/user/:user_id', calendar_controller.findCalendarByUser);
app.get('/api/calendars/user/class/:user_id/:calendar_id', calendar_controller.findCalendarByUserClass);

//USER CALENDARS
app.post('/api/usercalendar/add/:user_id/:calendar_id', calendar_controller.subscribeToCalendar);

//ASSIGNMENTS
app.post('/api/assignments/add', assignment_controller.createAssignment);
app.get('/api/assignments/getall/:user_id', assignment_controller.getCalendarAssignments);



// app.get('/api/calendars/user/:user_id', assignment_controller.findAssignmetsByUser);




const PORT = 3005;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))