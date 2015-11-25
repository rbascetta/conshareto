var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var userController  = require('../controllers/users');
var eventController = require('../controllers/events');
var request         = require('request');

// load environmental variables
require('dotenv').load();

// Determine search parameters
 // create start date variables
 var today        = new Date();
 var currentYear  = today.getFullYear();
 var currentMonth = today.getMonth() + 1;
 var currentDay   = today.getDate();
 var currentDate  = currentYear + "-" + currentMonth + "-" + currentDay;

 // set end date equal to one month after start date
 var endDay       = currentDay;
 var endMonth     = currentMonth + 1;
 var endYear      = currentYear;
 if ((endMonth=="13") || (endMonth==13)) {
   endMonth = 1;
   endYear += 1;
 };
 var endDate      = endYear + "-" + endMonth + "-" + endDay;

module.exports = function(app, passport) {

  // Search Jambase API per client request
  app.post('/search', function(req, res, next){
    console.log(req.body);

    // assign HTTP request variables
    var baseUri     = "http://api.jambase.com/events";
    var jamKey      = "&api_key=" + process.env.JAMBASE_KEY;
    var zip         = req.body.zip? encodeURIComponent(req.body.zip) : "90017";
    var zipParam    = "?zipCode=" + zip;
    var radius      = req.body.radius? encodeURIComponent(req.body.radius) : "10";
    var radiusParam = "&radius=" + radius;
    var distParams  = zipParam + radiusParam;
    var startParam  = "&startDate=" + currentDate;
    var endParam    = "&endDate=" + endDate;
    var dateParams  = startParam + endParam;

    // build full URI for http request to Jambase API
    uri = baseUri + distParams + dateParams + jamKey;

    console.log("Attempting to connect to: ", uri);

    // send http request to the Jambase API
    request.get(uri, function(err, response, body) {
      var body = JSON.parse(body);

      // Call res.send in the API request's callback*!
      console.log("body.Events: ", body.Events)
      res.send(body.Events);
    });
  });

  /* GET home page. */

  app.get('/', function(req, res, next) {
    res.render('index', { title: "conshareto", user: req.user });
  });


  // Google Authentication / Login
    app.get('/auth/google', passport.authenticate(
      'google',
      { scope: ['profile', 'email'] }
    ));

    app.get('/oauth2callback', passport.authenticate(
      'google',
      { successRedirect : '/', failureRedirect : '/' }
    ));

    app.get('/logout', function(req, res){
      req.logout(); res.redirect('/');
    });

  // return all events
  app.get('/myevents', userController.myEvents);

  app.put('/search/:id', eventController.attendEvent);
}



function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

