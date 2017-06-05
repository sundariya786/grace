var express  = require('express');
var app      = express();
var http = require("http");
var port     = process.env.PORT || 8080;
var bodyParser=require('body-parser');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://localhost:27017/guest";
// Connect to the db
app.set('view engine', 'ejs');
app.use(bodyParser());
// app.get('/',function(req,res){
// res.render('guestlogin.ejs');
// });
app.post('/guestlogin1',function(req,res){
 
 var e=req.body.username;
 var pw=req.body.password;
 console.log("---------------->"+e+"-------"+pw);
  MongoClient.connect(url, function(err, db) {   
  var cursor= db.collection('guestcollection').find({
   	$and:[{"email":e},
   		{"password":pw}]
   });
  if(cursor)
  {

  	res.render('guestdetails.ejs');
  }
  else
  {
  	res.render('guestlogin.ejs');
  }
});
});