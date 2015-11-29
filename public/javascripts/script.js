var searchResults=[];

$(document).ready(function() {

  function blah() {
    return "blah";
  }

  var eventTemplate = _.template($("#event-template").html());
  var attendEventTemplate = _.template($("#attend-event-template").html());
  var followEventTemplate = _.template($("#follow-event-template").html());
  $('#event_search').on('click', function(el){
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {zip: $('#zip_search').val()}
    }).done(function(events){
      searchResults = events;
      $('.wrapper').remove();
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
      $('.follow').off();
      $('.follow').on('click', function() {
        var jamId = $(this).attr('data');
        console.log(jamId);
        var followEvent;
        searchResults.forEach(function(result) {
            if (result.Id == jamId) {
                followEvent = result;
            }
        });
        console.log(followEvent);
        $.ajax({
          url: '/api/followevent',
          method: 'POST',
          data: followEvent
        }).done(function(data) {
            console.log(data);
        });
      });
    });
  });
  $('#myAttendButton').off();
  $('#myAttendButton').on('click', function() {
    $.ajax({
      url: 'api/myattendevents',
      method: 'GET',
    }).done(function(myEvents){
      $('.wrapper').remove();
      myEvents.forEach(function(event){
        $('body').append(
          attendEventTemplate({event: event})
        );
      });
      $('.unattend').off();
      $('.unattend').on('click', function() {
        var eventId = $(this).attr('data');
        var unAttendEvent;
        myEvents.forEach(function(result) {
            if (result._id === eventId) {
              unAttendEvent = result;
            }
        });
        $(this).parent().parent().parent().parent().parent().parent().parent().remove();
        $.ajax({
          url: '/api/unattendevent',
          method: 'Post',
          data: unAttendEvent
        }).done(function(data) {
            console.log(data);
        });
      });
      $('.follow').off();
      $('.follow').on('click', function() {
        var jamId = $(this).attr('data');
        console.log(jamId);
        $(this).parent().parent().parent().parent().parent().parent().parent().remove();
        $.ajax({
          url: '/api/followevent',
          method: 'POST',
          data: {Id: jamId}
        }).done(function(data) {
            console.log(data);
        });
      });
    });
  });
  $('#myFollowButton').off();
  $('#myFollowButton').on('click', function() {
    $.ajax({
      url: 'api/myfollowevents',
      method: 'GET',
    }).done(function(myEvents){
      $('.wrapper').remove();
      myEvents.forEach(function(event){
        $('body').append(
          followEventTemplate({event: event})
        );
      });
      $('.unfollow').off();
      $('.unfollow').on('click', function() {
        var eventId = $(this).attr('data');
        var unFollowEvent;
        myEvents.forEach(function(result) {
            if (result._id === eventId) {
              unFollowEvent = result;
            }
        });
        $(this).parent().parent().parent().parent().parent().parent().parent().remove();
        $.ajax({
          url: '/api/unfollowevent',
          method: 'Post',
          data: unFollowEvent
        }).done(function(data) {
            console.log(data);
        });
      });
      $('.attend').off();
      $('.attend').on('click', function() {
        var jamId = $(this).attr('data');
        console.log($(this).attr('data'));
        $(this).parent().parent().parent().parent().parent().parent().parent().remove();
        $.ajax({
          url: '/api/attendevent',
          method: 'POST',
          data: {Id: jamId}
        }).done(function(data) {
            console.log(data);
        });
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


