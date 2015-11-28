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
    var myAttendEvents = myEvents.filter(function(object, index){ return (myEvents[index].attending === true); })
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
    var myAttendEvents = myEvents.filter(function(object, index){ return (myEvents[index].following === true); })
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

    // var myAttendEventObjects = [];
    // var myAttendEvents = req.user.myEvents;
    // for (var i = 0; i < myAttendEvents.length; i++) {
    //   Event.findOne({_id: myAttendEvents[i].eventId}, function (err, event) {
    //       myAttendEventObjects.push(event);
    //       if (myAttendEventObjects.length === myAttendEvents.length) {
    //         console.log(myAttendEventObjects.filter(function(object, index){ return (myAttendEvents[index].attending === true); }));
    //         res.send(myAttendEventObjects.filter(function(object, index ){ return (myAttendEvents[index].attending === true); }));
    //       }
    //   });
    // }

        // var myAttendEventObjects = [];
    // var myAttendEvents = req.user.myEvents;
    // var arrayCounter = 0;
    // for (var i = 0; i < myAttendEvents.length; i++) {
    //   Event.findOne({_id: myAttendEvents[i].eventId}, function (err, event) {
    //       if (myAttendEvents[arrayCounter].attending === true) {
    //         myAttendEventObjects.push(event);
    //         if (arrayCounter === myAttendEvents.length-1) {
    //          // console.log(myAttendEventObjects.filter(function(object, index){ return (myAttendEvents[index].attending === true); }));
    //           console.log(myAttendEventObjects);
    //           res.send(myAttendEventObjects);
    //         }
    //       }
    //   });
    //   arrayCounter++;
    // }

    //     console.log('hi');
    // var myEventObjects = [];
    // var myEvents = req.user.myEvents;
    // for (var i = 0; i < myEvents.length; i++) {
    //   Event.findOne({_id: myEvents[i].eventId}, function (err, event) {
    //       myEventObjects.push(event);
    //       if (myEventObjects.length === myEvents.length) {
    //         console.log(myEventObjects.filter(function(object, index){ return (myEvents[index].following === true); }));
    //         res.send(myEventObjects.filter(function(object, index ){ return (myEvents[index].following === true); }));
    //       }
    //   });
    // }
