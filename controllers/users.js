var User = require('../models/user');

module.exports = {

  all: function(req, res) {
    User.find({}, function(err, users) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(users);
    });
  },

  myEvents: function (req, res) {
    res.send(req.user.myEvents);
  }

};
