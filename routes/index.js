var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var userController  = require('../controllers/users');
var eventController = require('../controllers/events');
var request         = require('request');

require('dotenv').load();

// Jambase variables
  // create Jambase date variable
    var currentFullDate = new Date();
    var currentYear  = currentFullDate.getFullYear();
    var currentMonth = currentFullDate.getMonth() + 1;
    var currentDay   = currentFullDate.getDate();
    var currentDate  = currentYear + "-" + currentMonth + "-" + currentDay;

  // assign HTTP request variables
  var baseUri         = "http://api.jambase.com/events";
  var zipPrefix       = "?zipCode=";
  var zip;
  var radiusPrefix    = "&radius=";
  var startDate       = "&startDate=" + currentDate;
  var endDatePrefix   = "&endDate=";
  var endDate;
  var jamKey          = "&api_key=" + process.env.JAMBASE_KEY;

router.get('/events', function(req, res, next){
  console.log(req.body);
  uri = baseUri + zipPrefix + zip + radiusPrefix + startDatePrefix
  + startDate + endDatePrefix + endDate + jamKey;

})
module.exports = function(app, passport) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: "conShareto", user: req.user });
  });

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
  router.get('/users', userController.all);

  // return all events
  router.get('/events', eventController.all);

  // mount API router
  app.use('/api', router);

}



function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}



