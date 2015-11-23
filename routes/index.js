var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var userController  = require('../controllers/users');
var eventController = require('../controllers/events');

/* GET home page. */

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



