var express      = require('express'); // use express framework
var path         = require('path'); // handle & transform file paths
var logger       = require('morgan'); // log actions in console for dev
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('./routes/index'); // import routes from file
var app          = express(); // assign "app" to express functions.
var debug        = require('debug')('app:http');
var session      = require('express-session'); // for login sessions
var passport     = require('passport'); // Easy API Authorization

// secure keys
require('dotenv').load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
