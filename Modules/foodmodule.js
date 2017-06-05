var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
//var configDB = require('./database.js');
var collectionName = 'foodcollection';
var TestsSchema = mongoose.Schema({
		typeoffood:         String,
       amountoffood:           String,
       location:               String,
       firstname:             String,
       mobile:                 String,
       
   });
// create the model for users and expose it to our app
module.exports = mongoose.model('foodcollection', TestsSchema,collectionName);