var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var collectionName = 'guestcollection';
var TestsSchema = mongoose.Schema({
		first_name:         String,
       last_name:           String,
       email:               String,
       mobile:  			String,
       city:                String,
       pincode:             String,
       password:            String,
   });
// create the model for users and expose it to our app
module.exports = mongoose.model('guestcollection', TestsSchema,collectionName);