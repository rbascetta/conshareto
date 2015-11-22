var mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/conshareto_db');

// export the connection
module.exports = mongoose;
