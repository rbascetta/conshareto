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
    var baseUri        = "http://api.jambase.com/events";
    var jamKey         = "&api_key=" + process.env.JAMBASE_KEY;
    var zip            = encodeURIcomponent(req.body.distance.zip);
    var zipParam       = "?zipCode=" + zip;
    var radius         = encodeURIcomponent(req.body.distance.radius);
    var radiusParam    = "&radius=" + radius;
    var distanceParams = zipParam + radiusParam;
    var startParam     = "&startDate=" + currentDate;
    var endParam       = "&endDate=" + endDate;
    var dateParams     = startParam + endParam;

    // build full URI for http request to Jambase API
    uri = baseUri + distanceParams + dateParams + jamKey;

    console.log("Attempting to connect to: ", uri);

    // send http request to the Jambase API
    request.get(uri, function(err, response, body) {
      var body = JSON.parse(body);

      // Call res.send in the API request's callback*!
      res.send(body.events);
    });
  });

  /* GET home page. */

  app.get('/', function(req, res, next) {
    res.render('index', { title: "conShareto", user: req.user });
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

  // return all users
  app.get('/users', userController.all);

  // return all events
  app.get('/myevents', eventController.all);

  // mount API router
  app.use('/api', router);

}



function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}



