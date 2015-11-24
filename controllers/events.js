var Event = require('../models/event');

module.exports = {

  all: function(req, res) {
    Event.find({}, function(err, events) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(events);
    });
  },

  eventInfo: function(req, res) {
    Event.findById(req.body.id, function (err, event) {
      res.send(event);
    });
  },

  attendEvent: function(req, res) {
    Event.findBy({name: req.body.name}, function(err, event) {
      if (event) {
          req.user.myEvents.push({eventId: event._id, attending: true, following: false});
          req.user.save(function(err) {
            res.send(req.user);
          });
      } else {
        var artistArray = [];
        req.body.artists.forEach(function(artist) {
          artistArray.push(artist);
        });
        var newEvent = new Event({
          name: req.body.name,
          artists: artistArray,
          date: req.body.date,
          venue:  {
            name: req.body.venue.name,
            address: req.body.venue.adddress,
            city: req.body.venue.city,
            state: req.body.venue.state,
            zipcode: req.body.venue.zipcode,
            venueUrl: req.body.venue.venueUrl
          },
          ticketUrl: req.body.ticketUrl
        });
        newEvent.save();
        req.user.myEvents.push({eventId: newEvent._id, attending: true, following: false});
        req.user.save(function(err) {
          res.send(req.user);
        });
      }
    });
  },

  followEvent: function(req, res) {
    Event.findBy({name: req.body.name}, function(err, event) {
      if (event) {
          req.user.myEvents.push({eventId: event._id, attending: false, following: true});
          req.user.save(function(err) {
            res.send(req.user);
          });
      } else {
        var artistArray = [];
        req.body.artists.forEach(function(artist) {
          artistArray.push(artist);
        });
        var newEvent = new Event({
          name: req.body.name,
          artists: artistArray,
          date: req.body.date,
          venue:  {
            name: req.body.venue.name,
            address: req.body.venue.adddress,
            city: req.body.venue.city,
            state: req.body.venue.state,
            zipcode: req.body.venue.zipcode,
            venueUrl: req.body.venue.venueUrl
          },
          ticketUrl: req.body.ticketUrl
        });
        newEvent.save();
        req.user.myEvents.push({eventId: newEvent._id, attending: false, following: true});
        req.user.save(function(err) {
          res.send(req.user);
        });
      }
    });
  },

  unattendEvent: function(req, res) {
    req.user.myEvents.forEach(function(event) {
      if (event.eventId === req.id) {
        event.attending = false;
      }
    });
  },

  unfollowEvent: function(req, res) {
    req.user.myEvents.forEach(function(event) {
      if (event.eventId === req.id) {
        event.following = false;
      }
    });
  }



};
