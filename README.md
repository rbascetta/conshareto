
<center><img src="https://conshareto.herokuapp.com/images/conshareto_blue_updated.png" width=350></center>

## Summary
Music lovers can search for and track upcoming local music events with a simple, no bs web app: 
<h2><center>.'. conshareto .'.</center></h1>
<br>
## Tony and the Ultras
Our project group is Tony and the Ultras. We are:<br>

- Anthony "Tony" Lee: API Co-Master, Feature King, Front Man
- Rachel Bascetta: Data Supermodeler, Editor-in-Chief of Documentation, Dutchess of Decks
- Andrew A. Anissi: Agile Director, Git Hub Guardian,
Routes/Server Logician
- Tara: Authentication Queen, Data Supermodeler, Controller of Controllers
- James Ewing: API Co-Master; Wireframer; Designer

Note: These roles are loose as we all have a hand in everything.

## Links
- <a href="https://conshareto.herokuapp.com/">Conshareto, as deployed on Heroku</a>
- <a href="https://trello.com/b/8NnxlvTx/conshareto">Trello</a>
- <a href="https://github.com/wingedearth/conshareto">Github</a>

## Presentation

<iframe id="iframe_container" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="550" height="400" src="https://prezi.com/embed/lcgdwibbdh2o/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI5KzJDY0E0WTg3eXVLU3Y0UU1SeFZoa0VBPT0&amp;landing_sign=lDJ7LlmmOzfHHyn3TTwUdymyZ4Uh9a9HnPCu_t0Wglk"></iframe>

## Description
The weekend is approaching and we can't find local music events! All the websites out there are sparse, confusing, and unhelpful. And we can't keep track of what events we're attending! This is a HUGE problem with no known solution.<br><br>
Our app is simple and user friendly. We offer easy access to, and tracking of local music events. This app doesn't seem to exist in an effective format yet. <br><br>
Conshareto is an app that is simple, straight to the point, and user friendly. Search for and track local music events, and keep track of events you're following or attending.


## Technologies Used

- Node.js
- Express.js
- AJAX
- Javascript
- HTML5
- CSS3
- OAuth/Passport
- APIs
- Github
- Heroku


## APIs consumed
- Jambase (Events)
- Spotify (Artists)
- Google (OAuth, Maps, User Data, Venues)
- Facebook (OAuth, User Data)
- Yelp (Venues)


## Wireframes
See <a href="https://trello.com/b/8NnxlvTx/conshareto">Trello</a>


## Data Models

####User Model Schema

Key|Value Type|Description|Example|
----------|-----|-----------|-------|
`firstName`|String|*captured by Google OAuth API*
`lastName`|String|*captured by Google OAuth API*
`email`|String|spots embedded into user
`myEvents`|[myEventSchema]|*added by user*|see "My Event Schema"
`googleId`|String|*captured by Google OAuth API*
`profileImageUrl`|String|*captured by Google OAuth API*
`created`|String|*captured when New User is created*

#####My Event Schema

Key|Value Type|Description|Example|
----------|-----|-----------|-------|
`event_id`|reference|*added by user*|reference ID from "Event Schema"
`attending`|boolean|*added by user*
`following`|boolean|*added by user*

####Event Model Schema

Key|Value Type|Description|Example|
----------|-----|-----------|-------|
`artists`|[artistSchema]|*captured by Jambase API*|see "Artist Schema"
`date`|String|*captured by Jambase API*
`venue`|venueSchema|*captured by Jambase API*|see "Venue Schema"
`ticketUrl`|String|*captured by Jambase API*
`jamBaseId`|String|*captured by Jambase API*

#####Venue Schema

Key|Value Type|Description|Example|
----------|-----|-----------|-------|
`name`|String|*captured by Jambase API*
`address`|String|*captured by Jambase API*
`city`|String|*captured by Jambase API*
`state`|String|*captured by Jambase API*
`zipcode`|String|*captured by Jambase API*
`venueUrl`|String|*captured by Jambase API*

#####Artist Schema

Key|Value Type|Description|Example|
----------|-----|-----------|-------|
`name`|String|*captured by Jambase API*


## RESTful API
Conshareto's API provides simple methods for creating events in a hosted online database, for creating user documents based on authenticated user logins, and for creating and uncreating "attending" and "following" relationships between users and events. 

The following are GET routes that allow a user to get a list of data on events that the user is attending or following, respectfully:

<ul>
    <li>router.get('/myattendevents', isLoggedIn, userController.myAttendEvents);</li>
    <li>router.get('/myfollowevents', isLoggedIn, userController.myFollowEvents);</li>
</ul>

The following are POST routes allowing a user to create new events in the hosted database (if the events are not already created), or to create a new kind of relationship between a user and such events: 

<ul>
     <li> router.post('/attendevent', isLoggedIn, eventController.attendEvent); </li>
     <li> router.post('/followevent', isLoggedIn, eventController.followEvent); </li>
</ul>

The application allows a user to delete events from their own view using "unAttend" or "unFollow" as applicable, while continuing to store and persist the event information in the hosted database even where a user has removed it. An icebox feature will allow users to view previously attended events after the event takes place and/or is removed from the standard attend/follow views. The following routes implement the client-side removal of event information from their view:

<ul>
     <li> router.post('/unattendevent', isLoggedIn, eventController.unAttendEvent); </li>
     <li> router.post('/unfollowevent', isLoggedIn, eventController.unFollowEvent); </li>
</ul>

The following route is used for Google login/authentication of a user, but also provides POST funcationality to create a new user in the application's hosted database if the user is not already in the database:

<ul><li>app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));</li></ul>

####Event Controller 

Method|Route|Description|Required Fields|Optional Fields|
-------------|------|-----------|-------|---|
`attendEvent`|`/attendevent`|a user can add an event to their myevents list as "attending"|`event object` or `jamBaseId`
`followEvent`|`/followevent`|a user can add an event to their myevents list as "following"|`event object` or `jamBaseId`
`unAttendEvent`|`/unattendevent`|a user change an event in their myevents list to "not attending"|`event Id` 
`unFollowEvent`|`/unfollowevent`|a user change an event in their myevents list to "not following"|`event Id` 

####User Controller 

Method|Route|Description|Required Fields|Optional Fields|
-------------|------|-----------|-------|---|
`myAttendEvents`|`/myattendevents`|a user can access a list of events they are attending|`user` 
`myFollowEvents`|`/myfollowevents`|a user can access a list of events they are following|`user` 


## User Stories, Sprint, Icebox
See <a href="https://trello.com/b/8NnxlvTx/conshareto">Trello</a>

#### MVP User Stories
- As a user I want to be able to login using Google.
- As a user I want to be able to search for concerts by zipcode and be able to set a parameter from that zipcode to filter my results.
- As a user I want to see the results of concerts happening in my area.
- As a user I want to be able to either follow or attend an event.
- As a user I want to be able to see which events I'm following and which events i'm attending.
- As a user I want to be able to unfollow or unattend an event and have my personal list of which concerts I am attending and following be automatically updated.


