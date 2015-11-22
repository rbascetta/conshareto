var express      = require('express'); // use express framework
var path         = require('path'); // handle & transform file paths
var logger       = require('morgan'); // log actions in console for dev
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var session      = require('express-session'); // for login sessions
var passport     = require('passport'); // Easy API Authorization
var mongoose     = require('./config/database');
//var routes       = require('./routes/index')(app, passport);
var users        = require('./routes/users');
var app          = express(); // assign "app" to express functions.
// secure keys
require('dotenv').load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('ejs').delimiter = '%';

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'Tony and the Ultras are Ultra!',
  resave: false,
  saveUninitialized: true
}));

// mount passport
app.use(passport.initialize());
app.use(passport.session());

// write css in scss files!
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: false
}));

app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport')(passport);

require('./routes/index')(app, passport);

module.exports = app;





