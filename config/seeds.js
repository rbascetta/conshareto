var mongoose = require('./database');

var User = require('../models/user');
var Event = require('../models/event');

User.remove({}, function(err){
  Event.remove({}, function(err) {
    var event1 = new Event({
            name: "The Mickey Mouse Club",
            artists: [{name: 'Mickey'}, {name: 'Goofy'}, {name: 'Minnie'}],
            date: new Date(2016, 1, 3),
            venue: {
                name: 'Walt Disney Concert Hall',
                address: '111 South Grand Ave',
                city: 'Los Angeles',
                state: 'CA',
                zipcode: '90012',
                venueUrl: 'http://www.laphil.com/philpedia/about-walt-disney-concert-hall'
            },
            ticketUrl: 'www.ticketmaster.com'
    });
    event1.save();
    var event2 = new Event({
            name: "Regina Spektor's Big Concert Tour",
            artists: [{name: 'Regina Spector'}],
            date: new Date(2015, 12, 11),
            venue: {
                name: 'Hollywood Bowl',
                address: '2301 Highland Ave',
                city: 'Los Angeles',
                state: 'CA',
                zipcode: '90068',
                venueUrl: 'http://www.hollywoodbowl.com/'
            },
            ticketUrl: 'www.ticketmaster.com'
    });
    event2.save();
    var kara = new User ({
      firstName: 'Kara',
      lastName: 'Danvers',
      email: 'kara@catco.com',
      profileImageUrl: null,
      googleId: 12345,
      myEvents: [
        {
          eventId: event1._id,
          attending: true,
          following: false
        },
        {
          eventId: event2._id,
          attending: false,
          following: true
        }
      ]
    });
    kara.save(function(err) {
      if (err) console.log(err);
      else {
        console.log("User saved to DB");
      }
      mongoose.disconnect();
    });
  });
});

        // function(err, blub1, blub2) {
        //   if(err) {
        //     console.log(err);
        //   } else {
        //     console.log("Database mongo-example seeded with 3 blubs.");
        //     blub1.populate('_creator').exec(function(err, blub1) {
        //       console.log(blub1);
        //     });
        //     mongoose.disconnect();
        //     console.log(blub2.comments[0]);
        //   }
        // }

