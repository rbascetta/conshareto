var searchResults=[];

$(document).ready(function() {
  var eventTemplate = _.template($("#event-template").html());
  $('#event_search').on('click', function(el){
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {zip: $('#zip_search').val()}
    }).done(function(events){
      searchResults = events;
      events.forEach(function(event){
        $('body').append(
          eventTemplate({event: event})
        );
      });
      $('.attend').off();
      $('.attend').on('click', function() {
        var jamId = $(this).attr('data');
        console.log(jamId);
        var attendEvent;
        searchResults.forEach(function(result) {
            if (result.Id == jamId) {
                attendEvent = result;
            }
        });
        console.log(attendEvent);
        $.ajax({
          url: '/api/attendevent',
          method: 'POST',
          data: attendEvent
        }).done(function(data) {
            console.log(data);
        });
      });
    });
  });
  $('#myeventbutton').off();
  $('#myeventbutton').on('click', function() {
    $.ajax({
      url: 'api/myevents',
      method: 'GET',
    }).done(function(myEvents){
      console.log('hi');
      console.log(myEvents);
      myEvents.forEach(function(event){
        $('body').append(event.venue.name);
      });
    });
  });

  // $('#moreinfo').on('click', function(el){
  //   $.ajax({
  //     url: '/eventinfo',
  //     method: 'GET',
  //     data: { event: $('#moreinfo').parent().val() }
  //   }).done(function(data) {
  //       console.log(data);
  //   });
  // })

});


