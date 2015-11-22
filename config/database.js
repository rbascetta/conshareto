var mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/derry_fishin_log');

// export the connection
module.exports = mongoose;
