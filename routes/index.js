var express = require('express');
var router = express.Router();
var passport = require('passport');
var userController = require('../controllers/users');

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

  router.get('/users', userController.all);
}
