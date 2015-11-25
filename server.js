var express      = require('express'); // use express framework
var path         = require('path'); // handle & transform file paths
var logger       = require('morgan'); // log actions in console for dev
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var session      = require('express-session'); // for login sessions
var passport     = require('passport'); // Easy API Authorization
var mongoose     = require('./config/database');
var users        = require('./routes/users');
var app          = express(); // assign "app" to express functions.

// secure keys
require('dotenv').load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('ejs').delimiter = '%';

// Create local variables for use thoughout the application.
app.locals.title = app.get('title');

// middleware!
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // parse cookies
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Tony and the Ultras are Ultra!',
  resave: false,
  saveUninitialized: true
}));

// mount passport
app.use(passport.initialize());
app.use(passport.session());


// write css in scss files
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: false
}));

app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport')(passport);

require('./routes/index')(app, passport);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// Useful for debugging the state of requests.
app.use(debugReq);

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

// error handlers

// development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

module.exports = app;


