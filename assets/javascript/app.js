// Patrick changes Start

// Upon loading page, will request user location immediately instead of using a zip code input
var userLat = '';
var userLon = '';

getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    userLat = position.coords.latitude
    userLon = position.coords.longitude
    console.log(userLat + " " + userLon)
};




function callGoogleApi() {
    var queryURL2 = 'https://cors-anywhere.herokuapp.com/https://www.google.com/maps/dir/?api=1&parameters' + '&key=AIzaSyC2qa5fEXAtZH6a4G_heRRbb7DVHB3pk8E'
  
    $.ajax({
      url: queryURL2,
      dataType: 'json',
      method: 'GET'
    }).then(function (response) {

    })
  initMap();}

  
  //invalid API key in HTML Still, has to be hidden from console inspection
  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsRenderer.setMap(map);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
          origin: {query: document.getElementById('start').value},
          destination: {query: document.getElementById('end').value},
          travelMode: 'DRIVING'
        },
        function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  }

// global variables
var counter = 0;
var offset = 0;
var option = 0;
var loveBtn = $('<br><button id="love-btn" class="btn btn-primary"> LOVE IT  </button>')
var hateBtn = $('<button id="hate-btn" class="btn btn-primary"> HATE IT </button>')

// firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCF-udTyqxcouGmz7SBrpB7Jr2BhdThzPg",
    authDomain: "chickentender-e2f0a.firebaseapp.com",
    databaseURL: "https://chickentender-e2f0a.firebaseio.com",
    projectId: "chickentender-e2f0a",
    storageBucket: "chickentender-e2f0a.appspot.com",
    messagingSenderId: "191417021703",
    appId: "1:191417021703:web:36a00686478c272845c1a2"
  };
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var database = firebase.database();

// submit button to activate Yelp API call
$('#submit').click(function(event){
  event.preventDefault();
  // calling yelp api
  yelpCall();
});

// yelp api call
function yelpCall (){
    var categories = $("#input-categories").val();
    var price = $('#input-price').val();
    var miles = $('#input-radius').val();
    var radius  = miles * 1609;
    console.log(price)
    console.log(radius)
    console.log(categories)
    // Yelp API URL
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + categories+ "&latitude=" + userLat + "&longitude=" + userLon + "&radius=" + radius + "&price" + price + "&open_now=true&offset=" + offset + "&limit=1";
    console.log(myurl);
    $.ajax({
      url: myurl,
      headers: {
          'Authorization':'Bearer LnkA2CEzdM-EAKVWX9RR-BPrwruVWTXUJeysRUuXJYCiB_KcFqVEE1RKDw1Rfe-u8n-x0DMuPy2AFinDnF90_ql9phu5y0C3CFTcijQ5AQEPf7YtZPXthq6M2XlzXnYx',
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
          $('#results').empty();
          console.log(data.businesses)
          var item = data.businesses;
          // If our results are greater than 0, continue
          var divRow = $('<div class="row">')
              // Itirate through the JSON array of 'businesses' which was returned by the API
          for (var i = 0; i < data.businesses.length; i++){
              var image = $('<img id="image-api" src="' + item[i].image_url + '"height="200" width="200">');
              var name = $('<h1 id="name-text">' + item[i].name + '</h1>');
              var rating = $('<h3 id="rating-text"> Rating: ' + item[i].rating + '</h3>');
              var category = $('<h4 id="category-text">' + item[i].categories[0].title + '</h4>');
              var price = $('<h5 id="category-text">' + item[i].price + '</h5>');
              var divCol = $('<div class="col-md-4 choice">')
              // Attaching tags to the column
              divCol.attr('name',item[i].name);
              divCol.attr('rating',item[i].rating);
              divCol.attr('image',item[i].image_url);
              divCol.attr('category',item[i].categories[0].title);
              divCol.append(name,category,rating,price,image,loveBtn,hateBtn);
              divRow.append(divCol);
              
              // Append our result into the page
              $('#results').append(divRow);
          } 

          // setting user choices to firebase database
          $('#love-btn').click(function(event){
            event.preventDefault();
            counter++ 
            offset++;
            option++;
            // pushing items to the firebase console
            database.ref('options' + option).push({
            name: $(divCol).attr('name'),
            category: $(divCol).attr('category'),
            rating: $(divCol).attr('rating'),
            image: $(divCol).attr('image'),
            });

            $('#results').empty()
            
            if (counter === 3) {
            $('#results').empty();
            counter = 0;
            option = 1
            retrieve();
            } else {
              yelpCall();
            };
         });
         $('#hate-btn').click(function(event){
           event.preventDefault();
           offset++;
           yelpCall();
         })
      }      
    });
};

function retrieve (){

    var snapRow = $('<div class="row">');
    // retrieving data set from user selections
    database.ref('options' + option).on('child_added', function(snapshot){
        var snapCol = $('<div class="col-md-4 snapChoice">');
        var snapName = $('<h1 id="name-text">' + snapshot.val().name + '</h1>');
        var snapCategory = $('<h4 id="category-text">' + snapshot.val().category + '</h4>');
        var snapRating = $('<h3 id="rating-text"> Rating: ' + snapshot.val().rating + '</h3>');
        var snapImage = $('<img id="image-api" src="' + snapshot.val().image + '"height="200" width="200">');
        var snapBtn = $('<br><button id="select-btn" class="btn"> Add To selection </button>')
        snapCol.attr('name',snapshot.val().name);
        snapCol.attr('category',snapshot.val().category);
        snapCol.attr('rating',snapshot.val().rating);
        snapCol.attr('image',snapshot.val().image);
        snapCol.append(snapName,snapCategory,snapRating,snapImage,snapBtn,loveBtn,hateBtn);
        snapRow.append(snapCol);
        $('#results').append(snapRow);
      
        $('#love-btn').click(function(event){
            event.preventDefault();
            counter++;
            var finalRow = $('<div class="row">');
            if (counter === 1){
                counter = 0;
                $('#results').empty();
                clearData();
                var finalCol = $('<div class="col-md-6 snapChoice">');
                var finalName = $('<h1 id="name-text">' + $(snapCol).attr('name') + '</h1>');
                var finalCategory = $('<h4 id="category-text">' + $(snapCol).attr('category') + '</h4>');
                var finalRating = $('<h3 id="rating-text"> Rating: ' + $(snapCol).attr('rating') + '</h3>');
                var finalImage = $('<img id="image-api" src="' + $(snapCol).attr('image') + '"height="200" width="200">');
                finalCol.append(finalName,finalCategory,finalRating,finalImage);
                finalRow.append(finalCol);
                $('#results').append(finalRow);
                // go into function to show results and display with col-md-6
            };
        });
        $('#hate-btn').click(function(event){
          event.preventDefault();
          $('#results').empty();
          option++;
          retrieve();
        })
    });

};

// function to clear firebase database
function clearData (){
    var option1 = database.ref('options' + 1);
    var option2 = database.ref('options' + 2);
    var option3 = database.ref('options' + 3);
    option1.remove();
    option2.remove();
    option3.remove();
}

// Create function to display time to make a choice and use a metric of the time to say get divorce/break up use another api to display dating apps 

//   create a timer function to start once user inputs zip code and clicks submit     
