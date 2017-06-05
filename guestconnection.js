var express  = require('express');
var app      = express();
var http = require("http");
var port     = process.env.PORT || 8080;
var bodyParser=require('body-parser');
var assert = require('assert');
var User = require('./modules/module.js');
var newuser=new User();
newuser.first_name("Jassu");
newuser.last_name("Saini");
newuser.city("Nawlgarh");
newuser.save(function(err) {
                               if (err)
                                   throw err;
                              return done(null, newuser);
                              console.log("--------Saved");
                           }); 
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://localhost:27017/guest";
// Connect to the db
app.set('view engine', 'ejs');
app.use(bodyParser());
console.log("Connected");

app.get('/',function(req,res){
 res.render('index.ejs');
});
app.post('/signin1',function(req,res){
 var f=req.body.fname;
 var l=req.body.lname;
 var e=req.body.email;
 var m=req.body.mobileno;
 var p=req.body.pincode;
 var c=req.body.city;
 var pw=req.body.password;
  MongoClient.connect(url, function(err, db) {
 // assert.equal(null, err);     
   db.collection('guestcollection').insertOne( {
       "first_name":f,
       "last_name":l,
       "email":e,
       "mobile":m,
       "city":c,
       "pincode":p,
       "password":pw
   });
});
  res.render('guestlogin.ejs');
});

app.post('/guestlogin1',function(req,res){
 
 var e=req.body.username;
 var pw=req.body.password;
 // console.log("---------------->"+e+"-------"+pw);
  MongoClient.connect(url, function(err, db) {   
  db.collection('guestcollection').findOne(
   	{ "email":e}
   	},function(err,result){
   		if(result)
   		{	
   			db.collection('guestcollection').findOne(
   			{ "password":pw},function(err,result1)
   			{
   				if(result1)
   				{
   					res.render('guestdetail.ejs');
   				}
   				else
   				{
   					res.send("Your password  is invalid");
   				}
   			}
   		}
   		else
   		{
   			res.send("Your Email id is invalid");
   		}
   	});
});
});


app.listen(port);
console.log('The magic happens on port ' + port);




