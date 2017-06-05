var express  = require('express');
var app      = express();
var http = require("http");
var port     = process.env.PORT || 8080;
var bodyParser=require('body-parser');
var session=require('express-session');
var assert = require('assert');
var guestuser = require('./Modules/module.js');
var agentuser = require('./Modules/agentmodule.js');
 var User1 = require('./Modules/foodmodule.js');
var passport = require('passport');
//var passport1 = require('passport1');
var mongoose=require('mongoose');
var configDB = require('./database.js');
var flash    = require('connect-flash');
require('./passport.js')(passport);
app.use(express.static(__dirname + '/public'));
//require('./passport1.js')(passport);
///mongoose.connect(configDB.url);
//app.configure(function() {

	// set up our express application
	//app.use(express.logger('dev')); // log every request to the console
	//app.use(express.cookieParsers()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms
    app.use(express.static(__dirname + '/assets'));
    app.use(express.static('public'));
    app.use(express.static('styles'));
	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

//});
app.get('/',function(req,res){
 res.render('guestagent.ejs');
});
app.get('/guestlogin',function(req,res){
 res.render('guestlogin.ejs');
});
app.get('/agentlogin',function(req,res){
 res.render('agentlogin.ejs');
});
app.post('/guestlogin1', passport.authenticate('localguest-login', {
        successRedirect: '/enter_food', // redirect to the secure profile section
        failureRedirect: '/guest_login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // process the signup form
    app.post('/guestsignup', passport.authenticate('localguest-signup', {
        successRedirect: '/enterfood', // redirect to the secure profile section
        failureRedirect: '/guest_signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.post('/agentlogin', passport.authenticate('localagent-login', {
        successRedirect: '/agentsearch', // redirect to the secure profile section
        failureRedirect: '/agentlogin', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // process the signup form
    app.post('/agentsignup', passport.authenticate('localagent-signup', {
        successRedirect: '/agentsearch', // redirect to the secure profile section
        failureRedirect: '/agentsignup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.post('/agent_search',function(req,res){
     res.render('agentsearch.ejs');
 });

 app.post('/foodanduser',function(req,res){
  var location=req.body.selectpicker;
  if(location=="Select")
  {
    return res.render('agentsearch.ejs');
  }
  else{
  User1.find({"location" : location},function(err,doc)
    { 

        console.log(doc);
      return res.render('foodanduser.ejs',{result:doc});


    });
}
  
 });

app.post('/food',function(req,res){
		var newuser1=new User1();
    newuser1.firstname=   req.user.first_name;
    //console.log(req.user);
    newuser1.mobile=       req.user.mobile;
		newuser1.typeoffood=   req.body.tof;
		newuser1.amountoffood= req.body.aof;
		newuser1.location=     req.body.selectpiker;
		 if(newuser1.location=="Select")
		{
			 return res.render('enterfood.ejs');
		}
    else {
		return newuser1.save(function(err) {
                               if (err)
                                   throw err;
                               res.render('guestagent.ejs');
                              
                           });
  }

	});

   app.get('/guestlogin',function(req,res){
 res.render('guestlogin.ejs');
});
   app.get('/guest_login',function(req,res){
 res.render('guestlogin.ejs');
});
     app.get('/guestlogin1',function(req,res){
 res.render('guestagent.ejs');
});
   app.get('/guestsignup',function(req,res){
 res.render('index.ejs');
});
    app.get('/guest_signup',function(req,res){
 res.render('index.ejs');
});
  
   app.get('/agent__signup',function(req,res){
 res.render('agentsignup.ejs');
});
    app.get('/enterfood',function(req,res){
 res.render('enterfood.ejs');
});
     app.get('/enter_food',function(req,res){
 res.render('enterfood.ejs');
});
    app.get('/agentsearch',function(req,res){
res.render('agentsearch.ejs');
});

   app.get('/agentlogin',function(req,res){
 res.render('agentlogin.ejs');
});
   app.get('/agentsignup',function(req,res){
 res.render('agentsignup.ejs');
});
   app.get('/guest_login',function(req,res){
 res.render('guestlogin.ejs');
});
   app.get('/index',function(req,res){
 res.render('index.ejs');
});
app.listen(port);
console.log('The magic happens on port ' + port);
