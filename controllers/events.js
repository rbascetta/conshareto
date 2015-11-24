var Event = require('../models/event');

module.exports = {

  all: function(req, res) {
    Event.find({}, function(err, events) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(events);
    });
  },

  attendEvent: function(req, res) {
    Event.findBy({name: req.body.name}, function(err, event) {
      if (event) {
        User.findById(req.user.id, function(err, user) {
          user.myEvents.push({eventId: event._id, attending: true, following: false});
          user.save(function(err) {
            res.send(user);
          });
        });
      } else {
        var newEvent = new Event({
          name: req.body.name,
          artists: [artistSchema],
          date: req.body.date,
          venue:  req.body.venue.name,
          ticketUrl: req.body.ticketUrl
        });
        newEvent.save();
        User.findById(req.user.id, function(err, user) {
          user.myEvents.push({eventId: newEvent._id, attending: true, following: false});
          user.save(function(err) {
            res.send(user);
          });
        });
      }
    });

  }
};
