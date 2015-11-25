var searchResults=[];
// $('.attend-event').on('click', function(el) {

//   var  eventId
//  if the event is already in database
//   set eventId = the id
//  create new event and set eventId equal to the id
//  send eventId to user list of events
// });



$('#event_search').on('click', function(el){
  $.ajax({
    url: '/search',
    method: 'POST',
    data: {zip:$('#zip_search').val()}
  }).done(function(events){
    searchResults = events;
    events.forEach(function(event){
      $('body').append(
        '<div id=' + event.Id + '>' + 'Date: ' + event.Date
        + ' Venue: '+ event.Venue.Name + ' Artist: '+ event.Artists[0].Name
        +'</div>'
        );
    });
  });
});

