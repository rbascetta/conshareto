var Event = require('../models/event');
var User = require('../models/user');

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
    console.log('The usery user is: ' + req.user.firstName + ' ' + req.user.id);
    User.findById(req.user.id, function(err, currentUser) {
      console.log('The callback user is ' + currentUser.firstName);
      Event.findOne({jamBaseId: req.body.Id}, function(err, event) {
        if (event) {
            currentUser.myEvents.push({eventId: event._id, attending: true, following: false});
            console.log('The event venue is ', event.venue.name);
            console.log('the id is' + event._id);
            currentUser.save(function(err) {
              res.json(currentUser.myEvents);
              console.log('the user is saved with my events: ' + currentUser.myEvents);
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
              address: req.body.Venue.Address,
              city: req.body.Venue.City,
              state: req.body.Venue.StateCode,
              zipcode: req.body.Venue.ZipCode,
              venueUrl: req.body.Venue.Url,

            },
            ticketUrl: req.body.TicketUrl,
            jamBaseId: req.body.Id
          });
          newEvent.save(function(err) {
            console.log('the new id is' + newEvent._id);
            console.log('The event is ' + newEvent);
            currentUser.myEvents.push({eventId: newEvent._id, attending: true, following: false});
            currentUser.save(function(err) {
              console.log('My events are :' + currentUser.myEvents);
              res.json(currentUser.myEvents);
            });
          });
        }
      });
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
