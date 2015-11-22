var User = require('../models/user');

module.exports = {

  all: function(req, res) {
    User.find({}, function(err, user) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(user);
    });
  },

};
