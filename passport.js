var LocalStrategy    = require('passport-local').Strategy;
var User       		= require('./Modules/module.js');
var agentuser            = require('./Modules/agentmodule.js');
var User11 = require('./Modules/foodmodule.js');
var passport = require('passport');
var mongoose=require('mongoose');
var configDB = require('./database.js');
var flash    = require('connect-flash');
mongoose.connect(configDB.url);
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('localguest-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',

        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
            	//console.log("Already exist!!!!");
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser            = new User();
                newUser.first_name          = req.body.fname;
                newUser.last_name = req.body.lname;
                newUser.mobile=req.body.mobile;
                newUser.email=req.body.email;
                newUser.password=req.body.password;
                newUser.city=req.body.city;
                newUser.pincode=req.body.pincode;
                
         console.log(newUser.email);
            }
            newUser.save(function(err) {
                               if (err)
                                   throw err;
                              return done(null, newUser);
                           });

        });

    }));
    passport.use('localguest-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            //res.render('guestdetails.ejs')
           //  var newuser11=new User11();
           // newuser11.first_name=user.first_name;
           // newuser11.mobile=user.mobile;
           // newuser11.save(function(err) {
           //                     if (err)
           //                         throw err;
           //                    return done(null, user);
           //                 });
            return done(null, user);
        });

    }));
passport.use('localagent-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        agentuser.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                //console.log("Already exist!!!!");
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser            = new agentuser();
                newUser.first_name          = req.body.fname;
                newUser.last_name = req.body.lname;
                newUser.mobile=req.body.mobile;
                newUser.email=req.body.email;
                newUser.password=req.body.password;
                newUser.city=req.body.city;
                newUser.pincode=req.body.pincode;
                console.log(newUser.email);
            }
            newUser.save(function(err) {
                               if (err)
                                   throw err;
                              return done(null, newUser);
                           });

        });

    }));
    passport.use('localagent-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        guestuser.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            //res.render('guestdetails.ejs')
           //  var newuser11=new User11();
           // newuser11.first_name=user.first_name;
           // newuser11.mobile=user.mobile;
           // newuser11.save(function(err) {
           //                     if (err)
           //                         throw err;
           //                    return done(null, user);
           //                 });
            return done(null, user);
        });

    }));

};