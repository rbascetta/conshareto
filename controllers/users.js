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
    if (req.user.myEvents) {
      console.log(req.user.firstName);
      req.user.myEvents.forEach(function (myEvent) {
        Event.findOne({_id: myEvent.eventId}, function (err, event) {
          myEventObjects.push(event);
          //console.log("inside the find by id: ", myEventObjects[0]);
          return myEventObjects;
        }).then(function(myEventObjects) {
        console.log("inside the for each: ", myEventObjects[0]);
        return myEventObjects;
      }).then(function(myEventObjects) {
     // console.log("just before we send: " + myEventObjects[0].venue.name);
        res.json(myEventObjects);
      });
    });
    } else {
      res.json(myEventObjects);
    }

  }

};
