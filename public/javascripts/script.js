$('.attend-event').on('click', function(el) {

 //  var  eventId
 // if the event is already in database
 //  set eventId = the id
 // create new event and set eventId equal to the id
 // send eventId to user list of events
});



$('#search').on('click', function(el){
  $.ajax({
    url: '/search',
    method: 'GET',
    data: {zip:$('').val(), radius:$('').val()}
  }).done(function(data){

  })
})
