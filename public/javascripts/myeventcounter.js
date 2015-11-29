
function attendCounter(eventsarray) {
  var counter = 0;
  for (var i=0; i<eventsarray.length; i++) {
    if (eventsarray[i].attending == true) {
      counter += 1;
    }
  }
  return counter;
}

function followCounter(eventsarray) {
  var counter = 0;
  for (var i=0; i<eventsarray.length; i++) {
    if (eventsarray[i].following == true) {
      counter += 1;
    }
  }
  return counter;
}

function blah() {
  return "blah";
}
