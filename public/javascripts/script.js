var searchResults=[];


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
        + '<button class="attend" data='+ event.Id+'>attend</button></div>'
        );
    });
    $('.attend').on('click', function() {
        console.log("clicked");
            // $.ajax({
            //   url: '/attendevent',
            //   method: 'POST',
            //   data: {}
            // });

    });
  });
});

