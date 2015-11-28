var User = require('../models/user');
var Event = require('../models/event');

module.exports = {

  all: function(req, res) {
    User.find({}, function(err, users) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(users);
    });
  },

  myAttendEvents: function (req, res) {
    var myEventObjects = [];
    var myEvents = req.user.myEvents;
    var myAttendEvents = myEvents.filter(function(object, index){ return (myEvents[index].attending === true); });
    for (var i = 0; i < myAttendEvents.length; i++) {
      Event.findOne({_id: myAttendEvents[i].eventId}, function (err, event) {
        myEventObjects.push(event);
        if (myEventObjects.length === myAttendEvents.length) {
          res.send(myEventObjects);
        }
      });
    }
  },

   myFollowEvents: function (req, res) {
    var myEventObjects = [];
    var myEvents = req.user.myEvents;
    var myAttendEvents = myEvents.filter(function(object, index){ return (myEvents[index].following === true); });
    for (var i = 0; i < myAttendEvents.length; i++) {
      Event.findOne({_id: myAttendEvents[i].eventId}, function (err, event) {
        myEventObjects.push(event);
        if (myEventObjects.length === myAttendEvents.length) {
          res.send(myEventObjects);
        }
      });
    }
  }

};
