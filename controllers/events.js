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
    Event.findBy({jamBaseId: req.body.Id}, function(err, event) {
      if (event) {
          req.user.myEvents.push({eventId: event._id, attending: true, following: false});
          req.user.save(function(err) {
            res.send(req.user);
          });
      } else {
        var artistArray = [];
        req.body.Artists.forEach(function(artist) {
          artistArray.push(artist.Name);
        });
        var newEvent = new Event({
          artists: artistArray,
          date: req.body.Date,
          venue:  {
            name: req.body.Venue.Name,
            address: req.body.Venue.Adddress,
            city: req.body.Venue.City,
            state: req.body.Venue.StateCode,
            zipcode: req.body.Venue.ZipCode,
            venueUrl: req.body.Venue.Url
          },
          ticketUrl: req.body.TicketUrl
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
    Event.findBy({jamBaseId: req.body.Id}, function(err, event) {
      if (event) {
          req.user.myEvents.push({eventId: event._id, attending: false, following: true});
          req.user.save(function(err) {
            res.send(req.user);
          });
      } else {
        var artistArray = [];
        req.body.Artists.forEach(function(artist) {
          artistArray.push(artist.Name);
        });
        var newEvent = new Event({
          artists: artistArray,
          date: req.body.Date,
          venue:  {
            name: req.body.Venue.Name,
            address: req.body.Venue.Adddress,
            city: req.body.Venue.City,
            state: req.body.Venue.StateCode,
            zipcode: req.body.Venue.ZipCode,
            venueUrl: req.body.Venue.Url
          },
          ticketUrl: req.body.TicketUrl
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
