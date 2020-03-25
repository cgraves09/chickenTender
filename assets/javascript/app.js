
 // Patrick changes Start

// Upon loading page, will request user location immediately instead of using a zip code input

// Location Code: Upon loading page, will request user location immediately instead of using a zip code input

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

// Location Code End; Working.
// new
// Google Maps API Code: Calls the Google Maps API to display the map.  
function callGoogleApi() {
  var userCoords = userLat + "," + userLon;
  var destinationCoords = locationLat + "," + locationLon;
  var apiKey = 'AIzaSyBbn_l6L-PlaPtI_4DvG5nQ_Eti1o0kbOA';
  var queryURL =  'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin=' + userCoords + '&destination=' + destinationCoords +'&key=' + apiKey;
    $.ajax({
      url: queryURL,
      dataType: 'json',
      method: 'GET'
    }).then(function (response) {
      console.log(response);
       initMap();
    })
   
}

  // Google Maps API Code End; Display Map but not specific location yet.
      function initMap() {
        var directionsRenderer = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: userLat, lng: userLon}
        });
        directionsRenderer.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsRenderer);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsRenderer);
        });
      }

   // Initialize Map Function Code
  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: userLat + userLon
    });

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('floating-panel'));

    var request = {
      origin: userLat + userLon,
      destination: locationLon + locationLat,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };


      function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        console.log(userLat)
        console.log(locationLat)
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: {lat: userLat, lng: userLon},  // Haight.
          destination: {lat: locationLat, lng: locationLon},  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }


// Initialize Map Code End

$('#user-name-input').modal('show');

// global variables
var counter = 0;
var offset = 0;
var option = 0;

var loveBtn = $('<button id="love-btn" class="btn btn-warning m-auto"> LOVE IT  </button>')
var hateBtn = $('<button id="hate-btn" class="btn btn-warning m-auto"> HATE IT </button>')

var loveBtn = $('<br> <i id="love-btn" class="fab fa-gratipay"></i>')
var hateBtn = $('<i id="hate-btn" class="far fa-times-circle"></i>')

var locationLon;
var locationLat;
var latToString;
var firstUser;
var secondUser;
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

$('#user-name-input-btn').click(function() {
  firstUser = $('#first-user').val();
  secondUser = $('#second-user').val();
  $('#user-name-input').modal('hide');
  console.log(firstUser)
});
// submit button to activate Yelp API call
$('#submit').click(function(event){
  event.preventDefault();
  latToString = Math.floor(Math.random()*50);
  $('#results-title').append('<h5>Alright ' + firstUser + '...Pick from the following choices:</h5>')
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

              var image = $('<img id="image-api" class="m-auto" src="' + item[i].image_url + '"height="200" width="200">');
              var name = $('<h1 id="name-text">' + item[i].name + '</h1>');
              var rating = $('<h3 id="rating-text"> Rating: ' + item[i].rating + '</h3>');
              var category = $('<h4 id="category-text">' + item[i].categories[0].title + '</h4>');
              var price = $('<h5 id="category-text">' + item[i].price + '</h5>');
              var divCol = $('<div class="col-md-4 choice text-center">');
              var loveCol =  $('<div class="col-md-2 m-auto p-0 d-flex justify-content-center">');
              var hateCol =  $('<div class="col-md-2 m-auto p-0 d-flex justify-content-center">');
              // Attaching tags to the column
              divCol.attr('name',item[i].name);
              divCol.attr('rating',item[i].rating);
              divCol.attr('image',item[i].image_url);
              divCol.attr('category',item[i].categories[0].title);
              divCol.attr('latitude',item[i].coordinates.latitude)
              divCol.attr('longitude',item[i].coordinates.longitude);
              divCol.append(name,category,rating,price,image);
              loveCol.append(loveBtn);
              hateCol.append(hateBtn);
              divRow.append(hateCol, divCol, loveCol);

              // var divCol = $('<div class="col-md-12" choice">')
              var image = $('<img id="image-api" class="col-md-12" src="' + item[i].image_url + '"height="400" width="300">');
              var name = $('<h2 id="name-text" class="col-md-6">' + item[i].name + '</h2>');
              var rating = $('<h4 id="rating-text" class="col-md-6"> Rating: ' + item[i].rating + '</h4>');
              var category = $('<h4 id="category-text" class="col-md-6">' + item[i].categories[0].title + '</h4>');
              var price = $('<h5 id="category-text" class="col-md-6"> Price: ' + item[i].price + '</h5>');
              
              // Attaching tags to the column
              divRow.attr('name',item[i].name);
              divRow.attr('rating',item[i].rating);
              divRow.attr('image',item[i].image_url);
              divRow.attr('category',item[i].categories[0].title);
              divRow.attr('latitude',item[i].coordinates.latitude)
              divRow.attr('longitude',item[i].coordinates.longitude);
              divRow.append(image,name,category,rating,price,loveBtn,hateBtn);
              // divRow.append(divCol);

              
              // Append our result into the page
              $('#results').append(divRow);
              $('#results').slideDown(2000);
          } 
          // conditional if yelp api doesnt return anymore businesses
          if (item.length === 0){
            $('#results').empty();
            $('#results-title').empty();
            $('#results-title').append('<h5>Okay halfway there...Pick from the follwing choices:</h5>')
            counter = 0;
            option = 1;
            $('#next-user-title').text('Hi ' + secondUser );
            $('#next-user-text').text('Okay she made her choices, lets not mess this up...')
            $('#next-user').modal('show'); 
            retrieve();
          }
          // setting user choices to firebase database
          $('#love-btn').click(function(event){
            event.preventDefault();
            counter++ 
            offset++;
            option++;
            // pushing items to the firebase console
            database.ref('options' + option + latToString).push({
            name: $(divRow).attr('name'),
            category: $(divRow).attr('category'),
            rating: $(divRow).attr('rating'),
            image: $(divRow).attr('image'),
            latitude: $(divRow).attr('latitude'),
            longitude: $(divRow).attr('longitude')
            });

            console.log(option)
            if (option === 2) {
            $('#results').empty();
            $('#results-title').empty();
            $('#results-title').append('<h5>Okay halfway there...Pick from the follwing choices:</h5>')
            $('#next-user-title').text('Hi ' + secondUser );
            $('#next-user-text').text('Okay she made her choices, lets not mess this up...')
            $('#next-user').modal('show');  
            counter = 0;
            option = 1;
            retrieve();
            } else {
              $('#results').slideUp(500);
              yelpCall();
              
            };
         });

         $('#hate-btn').click(function(event){
           event.preventDefault();
           offset++;
           $('#results').slideUp(2000);
           yelpCall();
        })
      }      
    });
};

function retrieve (){
  $('#results').empty();
    var snapRow = $('<div class="row">');
    // retrieving data set from user selections
    database.ref('options' + option + latToString).on('child_added', function(snapshot){
        var snapName = $('<h1 id="name-text"class="col-md-6">' + snapshot.val().name + '</h1>');
        var snapPrice = $('<h5 id="category-text" class="col-md-6">' + snapshot.val().price + '</h5>')
        var snapCategory = $('<h5 id="category-text" class="col-md-6">' + snapshot.val().category + '</h4>');
        var snapRating = $('<h3 id="rating-text"class="col-md-6"> Rating: ' + snapshot.val().rating + '</h3>');
        var snapImage = $('<img id="image-api" class="col-md-12" src="' + snapshot.val().image + '"height="400" width="300">');
        var latNum = snapshot.val().latitude;
        var lonNum = snapshot.val().longitude;
        snapRow.attr('name',snapshot.val().name);
        snapRow.attr('category',snapshot.val().category);
        snapRow.attr('rating',snapshot.val().rating);
        snapRow.attr('image',snapshot.val().image);
        snapRow.attr('price',snapshot.val().price);
        snapRow.append(snapImage,snapName,snapCategory,snapRating,snapPrice,loveBtn,hateBtn);
        locationLon = parseFloat(lonNum);
        locationLat = parseFloat(latNum);
        console.log(locationLon);
        console.log(locationLat);
        // append to the results div
        $('#results').append(snapRow);
        $('#results').slideDown(2000);
      
        $('#love-btn').click(function(event){
            event.preventDefault();
            counter++;
            var finalRow = $('<div class="row">');
            if (snapshot.val().name === snapshot.val().name){
              
                snapRow.empty();
                counter = 0;
                option = 0;
                $('#results').empty();
                $('#results-title').empty();
                clearData();
                var finalName = $('<h1 id="name-text"class="col-md-6">' + $(snapRow).attr('name') + '</h1>');
                var finalPrice = $('<h5 id="category-text" class="col-md-6">' + $(snapRow).attr('price') + '</h5>');
                var finalCategory = $('<h5 id="category-text" class="col-md-6">' + $(snapRow).attr('category') + '</h5>');
                var finalRating = $('<h3 id="rating-text"class="col-md-6"> Rating: ' + $(snapRow).attr('rating') + '</h3>');
                var finalImage = $('<img id="image-api" class="col-md-12" src="' + $(snapRow).attr('image') + '"height="400" width="300">');
                snapRow.append(finalImage,finalName,finalCategory,finalRating,finalPrice);
                $('#match').append(snapRow)
                $('#itsAMatch').modal('show');
                callGoogleApi();
            };
        });
        $('#hate-btn').click(function(event){
          event.preventDefault();
          $('#results').slideUp(2000);
          option++;
          retrieve();
        })
    });

};

// function to clear firebase database
function clearData (){
    database.ref('options' + 1 + latToString).remove();
    database.ref('options' + 2 + latToString).remove();
    database.ref('options' + 3 + latToString).remove();
    database.ref('options' + 4 + latToString).remove();
    database.ref('options' + 5 + latToString).remove();
    database.ref('options' + 6 + latToString).remove();
    database.ref('options' + 7 + latToString).remove();
    database.ref('options' + 8 + latToString).remove();
    database.ref('options' + 9 + latToString).remove();
    database.ref('options' + 10 + latToString).remove();
}

// Create function to display time to make a choice and use a metric of the time to say get divorce/break up use another api to display dating apps 

//   create a timer function to start once user inputs zip code and clicks submit     
