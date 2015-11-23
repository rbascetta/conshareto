var mongoose = require('mongoose');
var eventSchema = require('./event');

// The factSchema is used to embedded docs in as tudent doc.
// There is no model and no 'facts' collection

var myEventSchema = new mongoose.Schema({
  eventInfo: eventSchema,
  attending: Boolean,
  following: Boolean
});

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  myEvents: [myEventSchema],
  googleId: String,
  profileImageUrl: String,
  created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);
