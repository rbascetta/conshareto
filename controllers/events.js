var Event = require('../models/event');
var User = require('../models/user');

var locus = require('locus');

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
      Event.findOne({jamBaseId: req.body.Id}, function(err, event) {
        if (event) {
          var notInMyEvents = true;
          currentUser.myEvents.forEach(function(myEvent) {
            if (myEvent.eventId.equals(event._id)){
              console.log('This event is already in your myEvents list!');
              notInMyEvents = false;
              myEvent.attending = true;
              myEvent.following = false;
              currentUser.save(function(err) {
                res.send(currentUser.myEvents);
              });
            }
          });
          if (notInMyEvents) {
            currentUser.myEvents.push({eventId: event._id, attending: true, following: false});
            currentUser.save(function(err) {
              res.send(currentUser.myEvents);
              console.log('The user is saved with a new myEvent: ' + currentUser.myEvents);
            });
          }
        } else {
          var artistArray = [];
          req.body.Artists.forEach(function(artist) {
            artistArray.push({'name': artist.Name});
          });
          Event.create({
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
          }, function(err, newEvent){
            currentUser.myEvents.push({eventId: newEvent._id, attending: true, following: false});
            currentUser.save(function(err) {
              console.log('The user and new event are saved. My events are :' + currentUser.myEvents);
              res.send(currentUser.myEvents);
            });
          });
        }
      });
    });
  },

  followEvent: function(req, res) {
    console.log('The usery user is: ' + req.user.firstName + ' ' + req.user.id);
    User.findById(req.user.id, function(err, currentUser) {
      console.log('the jambase id is ' + req.body.Id);
      Event.findOne({jamBaseId: req.body.Id}, function(err, event) {
        console.log('the event found is', event);
        if (event) {
          var notInMyEvents = true;
          currentUser.myEvents.forEach(function(myEvent) {
            if (myEvent.eventId.equals(event._id)){
              console.log('This event is already in your myEvents list!');
              notInMyEvents = false;
              myEvent.attending = false;
              myEvent.following = true;
              currentUser.save(function(err) {
                res.json(currentUser.myEvents);
              });
            }
          });
          if (notInMyEvents) {
            currentUser.myEvents.push({eventId: event._id, attending: false, following: true});
            currentUser.save(function(err) {
              res.json(currentUser.myEvents);
              console.log('The user is saved with a new myEvent: ' + currentUser.myEvents);
            });
          }
        } else {
          var artistArray = [];
          req.body.Artists.forEach(function(artist) {
            artistArray.push({'name': artist.Name});
          });
          Event.create({
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
          }, function(err, newEvent){
            currentUser.myEvents.push({eventId: newEvent._id, attending: false, following: true});
            currentUser.save(function(err) {
              console.log('The user and new event are saved. My events are :' + currentUser.myEvents);
              res.json(currentUser.myEvents);
            });
          });
        }
      });
    });
  },

  unAttendEvent: function(req, res) {
    User.findById(req.user.id, function(err, currentUser) {
      currentUser.myEvents.forEach(function(event) {
        if (event.eventId.equals(req.body._id)) {
          event.attending = false;
          currentUser.save(function(err) {
            res.json(currentUser.myEvents);
          });
        }
      });
    });
  },

  unFollowEvent: function(req, res) {
    User.findById(req.user.id, function(err, currentUser) {
      currentUser.myEvents.forEach(function(event) {
        if (event.eventId.equals(req.body._id)) {
          event.following = false;
          currentUser.save(function(err) {
            res.json(currentUser.myEvents);
          });
        }
      });
    });
  }


};
