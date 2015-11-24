var mongoose = require('mongoose');

// connect to db
mongoose.connect(process.env.DATABASE_URL);

// export the connection
module.exports = mongoose;
