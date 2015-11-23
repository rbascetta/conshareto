# conshareto

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

####<u>User</u>
User Data:
<ul>
<li>First Name</li>
<li>Last Name</li>
<li>Email</li>
<li>My Events [My Events Data]</li>
<li>Google ID</li>
<li>Facebook Id</li>
<li>Profile Image Url</li>
<li>Created (defaults to current date)</li>
</ul>

My Events Data:
<ul>
<li>Event_id</li>
<li>Attending</li>
<li>Following</li>
</ul>

####<u>Events</u>
Event Data:
<ul>
<li>Artists [Artist Data]</li>
<li>Date</li>
<li>Venue [Venue Data]</li>
<li>Ticket Url</li>
</ul>

Venue Data:
<ul>
<li>Name</li>
<li>Address</li>
<li>City</li>
<li>State</li>
<li>Zipcode</li>
<li>Venue Url</li>
</ul>
  
 
Artist Data:
<ul>
<li>Name</li>
<li>uri</li>
</ul>


## User Stories, Sprint, Icebox
See <a href="https://trello.com/b/8NnxlvTx/conshareto">Trello</a>



