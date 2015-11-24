var User = require('../models/user');

module.exports = {

  all: function(req, res) {
    User.find({}, function(err, users) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(users);
    });
  },

  attendEvent: function(req, res) {
    User.findById(req.user.id, function(err, user) {
      user.myEvents.push({eventId: mongoose.Types.ObjectId(req.body.eventId), attending: true, following: false});
      user.save(function(err) {
        res.send(user);
      });
    });
  },

  followEvent: function(req, res) {
    User.findById(req.user.id, function(err, user) {
      user.myEvents.push({eventId: mongoose.Types.ObjectId(req.body.eventId), attending: false, follow: true});
      user.save(function(err) {
        res.send(user);
      });
    });
  },

  unattendEvent: function(req, res) {
    User.findById(req.user.id, function(err, user) {
      user.myEvents.eventId(req.params.id).remove();
      user.save(function(err) {
        res.send(user);
      });
    });
  },

  unfollowEvent: function(req, res) {
    User.findById(req.user.id, function(err, user) {
      user.myEvents.eventId(req.params.id).remove();
      user.save(function(err) {
        res.send(user);
      });
    });
  }

};
