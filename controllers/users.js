var User = require('../models/user');
var Event = require('../models/event');

module.exports = {

  all: function(req, res) {
    User.find({}, function(err, users) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(users);
    });
  },

  myEvents: function (req, res) {
    var myEventObjects = [];
    var myEvents = req.user.myEvents;
    for (var i = 0; i < myEvents.length; i++) {
      Event.findOne({_id: myEvents[i].eventId}, function (err, event) {
        myEventObjects.push(event);
        if (myEventObjects.length === myEvents.length) {
          res.send(myEventObjects);
        }
      });
    }
  }

};
