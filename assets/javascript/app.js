// global variables
var counter = 0;
var offset = 0;
var option = 0;
var loveBtn = $('<i id="love-btn" class="fab fa-gratipay col-md-2"></i>')
var hateBtn = $('<i id="hate-btn" class="far fa-times-circle col-md-2"></i>')
var locationLon;
var locationLat;
var ranNum;
var firstUser;
var secondUser;
var dataFoodImage;
var americanAbout = ["assets/images/american/1.jpeg","assets/images/american/2.jpeg","assets/images/american/3.jpeg","assets/images/american/4.jpeg","assets/images/american/5.png","assets/images/american/6.jpeg","assets/images/american/7.jpg","assets/images/american/8.jpg","assets/images/american/9.jpg","assets/images/american/10.jpg"];
var mexicanAbout = ["assets/images/mexican/1.jpg","assets/images/mexican/2.jpg","assets/images/mexican/3.jpg","assets/images/mexican/4.jpeg","assets/images/mexican/5.jpg","assets/images/mexican/6.jpeg","assets/images/mexican/7.jpg","assets/images/mexican/8.png","assets/images/mexican/9.jpg","assets/images/mexican/10.jpeg"];
var thaiAbout = ["assets/images/thai/1.png","assets/images/thai/2.jpeg","assets/images/thai/3.jpeg","assets/images/thai/4.png","assets/images/thai/5.jpg","assets/images/thai/6.jpeg","assets/images/thai/7.jpg","assets/images/thai/8.jpg","assets/images/thai/9.jpg","assets/images/thai/10.png"];
var greekAbout = ["assets/images/greek/1.png","assets/images/greek/2.jpg","assets/images/greek/3.png","assets/images/greek/4.jpg","assets/images/greek/5.jpg","assets/images/greek/6.jpeg","assets/images/greek/7.jpg","assets/images/greek/8.jpeg","assets/images/greek/9.jpeg","assets/images/greek/10.jpg"];
var indianAbout = ["assets/images/indian/1.jpg","assets/images/indian/2.jpeg","assets/images/indian/3.png","assets/images/indian/4.jpeg","assets/images/indian/5.jpeg","assets/images/indian/6.png","assets/images/indian/7.jpeg","assets/images/indian/8.png","assets/images/indian/9.jpg","assets/images/indian/10.png"];
var chineseAbout = ["assets/images/chinese/1.jpg","assets/images/chinese/2.jpg","assets/images/chinese/3.jpg","assets/images/chinese/4.jpg","assets/images/chinese/5.gif","assets/images/chinese/6.jpg","assets/images/chinese/7.jpg","assets/images/chinese/8.jpg","assets/images/chinese/9.jpeg","assets/images/chinese/10.jpg"];
var italianAbout = ["assets/images/italian/1.png","assets/images/italian/2.jpg","assets/images/italian/3.jpeg","assets/images/italian/4.jpg","assets/images/italian/5.jpeg","assets/images/italian/6.jpeg","assets/images/italian/7.jpeg","assets/images/italian/8.jpg","assets/images/italian/9.jpg","assets/images/italian/10.jpeg"]
var aboutCounter = 0
var aboutText;
// Location Code: Upon loading page, will request user location immediately instead of using a zip code input
var userLat = '';
var userLon = '';
// Inital Modal for User Names
$('#user-name-input').modal('show');

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
          center: {lat: userLat, lng: userLon},
        });
        directionsRenderer.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsRenderer);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsRenderer);
        });
      }

      function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        console.log(userLat)
        console.log(locationLat)
        var selectedMode = 'DRIVING';
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

// Function for selecting the images

// function imageSelector (){
//   if ($("#input-categories").val() === 'American'){
//     foodImage = $('<img class="col-md-12" src="' + americanFoodImage[imageCounter]+ '"height="400" width="300">')
//     dataFoodImage = americanFoodImage[imageCounter]
//     return foodImage, dataFoodImage
//   }
//   else if ($("#input-categories").val() === 'Mexican'){
//     foodImage = $('<img class="col-md-12" src="' + mexicanFoodImage[imageCounter]+ '"height="400" width="300">')
//     dataFoodImage = mexicanFoodImage[imageCounter]
//     return foodImage
//   }
//     else if ($("#input-categories").val() === 'Thai'){
//     foodImage = $('<img class="col-md-12" src="' + thaiFoodImage[imageCounter]+ '"height="400" width="300">')
//     dataFoodImage = thaiFoodImage[imageCounter]
//     return foodImage, dataFoodImage 
//   }
//     else if ($("#input-categories").val() === 'Greek'){
//     foodImage = $('<img class="col-md-12" src="' + greekFoodImage[imageCounter]+ '"height="400" width="300">')
//     dataFoodImage = greekFoodImage[imageCounter]
//     return foodImage, dataFoodImage 
//   }
//     else if ($("#input-categories").val() === 'Indian'){
//     foodImage = $('<img class="col-md-12" src="' + indianFoodImage[imageCounter]+ '"height="400" width="300">')
//     dataFoodImage = indianFoodImage[imageCounter]
//     return foodImage, dataFoodImage 
//   }
//     else if ($("#input-categories").val() === 'Chinese'){
//     foodImage = $('<img class="col-md-12" src="' + chineseFoodImage[imageCounter]+ '"height="400" width="300">')
//     dataFoodImage = chineseFoodImage[imageCounter]
//     return foodImage, dataFoodImage 
//   }
//     else if ($("#input-categories").val() === 'Italian'){
//     foodImage = $('<img class="col-md-12" src="' + italianFoodImage[imageCounter]+ '"height="400" width="300">')
//     dataFoodImage = italianFoodImage[imageCounter]
//     return foodImage, dataFoodImage 
//   }


// }


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

// User Name Values Function
$('#user-name-input-btn').click(function() {
  firstUser = $('#first-user').val();
  secondUser = $('#second-user').val();
  $('#user-name-input').modal('hide');
});

// submit button to activate Yelp API call
$('#submit').click(function(event){
  event.preventDefault();
  ranNum = Math.floor(Math.random()*50);
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
    
  // Yelp API URL
  var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + categories+ "&latitude=" + userLat + "&longitude=" + userLon + "&radius=" + radius + "&price" + price + "&open_now=true&offset=" + offset + "&limit=1";
  
  $.ajax({
    url: myurl,
    headers: {
      'Authorization':'Bearer LnkA2CEzdM-EAKVWX9RR-BPrwruVWTXUJeysRUuXJYCiB_KcFqVEE1RKDw1Rfe-u8n-x0DMuPy2AFinDnF90_ql9phu5y0C3CFTcijQ5AQEPf7YtZPXthq6M2XlzXnYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      $('#results').empty();

      var item = data.businesses;
      var divRow = $('<div class="row">')
      // Itirate through the JSON array of 'businesses' which was returned by the API
      for (var i = 0; i < data.businesses.length; i++){
        var image = $('<img class="col-md-7" src="' + item[i].image_url + '"height="400" width="300">')
        var name = $('<h2 id="name-text" class="col-md-6">' + item[i].name + '</h2>');
        var rating = $('<h4 id="rating-text" class="col-md-6"> Rating: ' + item[i].rating + '</h4>');
        var category = $('<h4 id="category-text" class="col-md-6">' + item[i].categories[0].title + '</h4>');
        var price = $('<h5 id="category-text" class="col-md-6"> Price: ' + item[i].price + '</h5>');
        var aboutMe = $('<h5 id="about-me" class="col-md-12"> About ' + item[i].name + '</h5>');
        
        // conditional if price comes back as undefined
        if (item[i].price === undefined){
          item[i].price = 'N/A'
          price = $('<h5 id="category-text" class="col-md-6"> Price: ' + item[i].price + '</h5>');
        }

        // Attaching tags to the column
        divRow.attr('name',item[i].name);
        divRow.attr('price', item[i].price);
        divRow.attr('rating',item[i].rating);
        divRow.attr('image',item[i].image_url);
        divRow.attr('category',item[i].categories[0].title);
        divRow.attr('latitude',item[i].coordinates.latitude);
        divRow.attr('longitude',item[i].coordinates.longitude);
        divRow.append(hateBtn,image,loveBtn,name,price,rating,aboutMe);

        // Append our result into the page
        $('#results').append(divRow);
        $('#results').slideDown(2000);
      } 
      // conditional if yelp api doesnt return anymore businesses
      if (item.length === 0){
        $('#results').empty();
        $('#results-title').empty();
        $('#results-title').append('<h5>Okay halfway there...Pick from the following choices:</h5>')
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
        database.ref('options' + option + ranNum).push({
          name: $(divRow).attr('name'),
          price: $(divRow).attr('price'),
          category: $(divRow).attr('category'),
          rating: $(divRow).attr('rating'),
          image: $(divRow).attr('image'),
          latitude: $(divRow).attr('latitude'),
          longitude: $(divRow).attr('longitude')
        });

        if (option === 3) {
          $('#results').empty();
          $('#results-title').empty();
          $('#results-title').append('<h5>Okay halfway there...Pick from the following choices:</h5>')
          $('#next-user-title').text('Hi ' + secondUser );
          $('#next-user-text').html('<h4>Okay she made her choices, lets not mess this up...</h4>')
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
           $('#results').slideUp(500);
           yelpCall();
        })
      }      
    });
};

function retrieve (){
  $('#results').empty();
  var snapRow = $('<div class="row">');
  // retrieving data set from user selections
  database.ref('options' + option + ranNum).on('child_added', function(snapshot){
    var snapName = $('<h1 id="name-text"class="col-md-6">' + snapshot.val().name + '</h1>');
    var snapPrice = $('<h5 id="category-text" class="col-md-6"> Price: ' + snapshot.val().price + '</h5>')
    var snapCategory = $('<h5 id="category-text" class="col-md-6">' + snapshot.val().category + '</h4>');
    var snapRating = $('<h3 id="rating-text"class="col-md-6"> Rating: ' + snapshot.val().rating + '</h3>');
    var snapAbout = $('<h5 id="about-me" class="col-md-12"> About ' + snapshot.val().name + '</h5>');
    var snapImage = $('<img id="image-api" class="col-md-7" src="' + snapshot.val().image + '"height="400" width="300">');
    var latNum = snapshot.val().latitude;
    var lonNum = snapshot.val().longitude;
    snapRow.attr('name',snapshot.val().name);
    snapRow.attr('category',snapshot.val().category);
    snapRow.attr('rating',snapshot.val().rating);
    snapRow.attr('image',snapshot.val().image);
    snapRow.attr('price',snapshot.val().price);

    snapRow.append(hateBtn,snapImage,loveBtn,snapName,snapPrice,snapRating,snapAbout);

    locationLon = parseFloat(lonNum);
    locationLat = parseFloat(latNum);

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
        var finalPrice = $('<h5 id="category-text" class="col-md-6">Price: ' + $(snapRow).attr('price') + '</h5>');
        var finalCategory = $('<h5 id="category-text" class="col-md-6">' + $(snapRow).attr('category') + '</h5>');
        var finalRating = $('<h3 id="rating-text"class="col-md-6"> Rating: ' + $(snapRow).attr('rating') + '</h3>');

        var finalAbout = $('<h5 id="about-me" class="col-md-12"> About ' + $(snapRow).attr('name') + '</h5>');
        var finalImage = $('<img id="image-api" class="col-md-7" src="' + $(snapRow).attr('image') + '"height="400" width="300">');
        snapRow.append(finalImage,finalName,finalPrice,finalRating,finalAbout);

        $('#results').append(snapRow)
        var matchGif = $('<img src="assets/images/chicken.gif" height="200" width="200">');
        $('#match').append(matchGif);
        $('#match').append('<h3> Congrats ' + firstUser + ' & ' + secondUser + ' you finally agreed on something</h3>')
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
  database.ref('options' + 2 + ranNum).remove();
  database.ref('options' + 1 + ranNum).remove();
  database.ref('options' + 3 + ranNum).remove();
  database.ref('options' + 4 + ranNum).remove();
  database.ref('options' + 5 + ranNum).remove();
  database.ref('options' + 6 + ranNum).remove();
  database.ref('options' + 7 + ranNum).remove();
  database.ref('options' + 8 + ranNum).remove();
  database.ref('options' + 9 + ranNum).remove();
  database.ref('options' + 10 + ranNum).remove();
}

// Create function to display time to make a choice and use a metric of the time to say get divorce/break up use another api to display dating apps 

//   create a timer function to start once user inputs zip code and clicks submit     