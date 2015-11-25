var mongoose = require('mongoose');
require('dotenv').load();
// connect to db
mongoose.connect(process.env.DATABASE_URL);


// export the connection
module.exports = mongoose;
