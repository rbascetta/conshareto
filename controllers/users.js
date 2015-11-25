var User = require('../models/user');

module.exports = {

  all: function(req, res) {
    User.find({}, function(err, users) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(users);
    });
  },

  myEvents: function (req, res) {
    myEventIdsArray = [];
    req.user.myEvents.forEach(function (myEvent) {
      myEventIdsArray.push(myEvent.eventId);
    });
    myEventObjects = [];
    myEventIdsArray.forEach(function (eventId) {
      Event.findById(eventId, function (err, event) {
        myEventObjects.push(event);
      });
    });
    res.send(myEventObjects);
  }

};
