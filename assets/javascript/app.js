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
var dataAboutMe;
var lineBreak = $('<hr id="line-break">')
var americanAbout = ['"Medium rare.  Thick.  Made just for you.  I like nibbles and bites.  Don’t be afraid to tell me your dirty desires.  Burger doesn’t judge.  Burger understands."',
'"I’m pillowy, squishy, and tender, with tight but soft buns.  Unwrap me and take in all the juices I have to offer.", “Not bragging, but I have layers upon layers of succulent, moist meat between two soft buns.  I’m also faster than delivery"',
'"Somebody call for six inches of heaven?  I’m all beef and ready to meat.  You bring the condoments?  Just joking, ketchup and mustard are fine."'];
var mexicanAbout = ['“My tortilla is hot and ready to be filled with some juicy, flavorful meat."','"How would you like to make my soft taco hard?  Let’s tacoboutit."',
'"I got gas today for $1.39, unfortunately it was at Taco Bell."'];
var thaiAbout = ['"If you’re trying Thai food for the first time, you’re gonna have a pad thai."','"If you’re looking for something hot, spicy, and full of intense, burning heat then look no further.  Btw, you’ll regret eating me tomorrow, but life is about the moment, right?"',
'"This place is more romantic than Thaitanic."'];
var greekAbout = ['"My Big Fat Greek Takeout Order"','"It’s time to come out, I am a hummusexual."','"Why be with a zero, when you can get with this gyro"'];
var indianAbout = ['"You know how many Indian food jokes I know?  Naan"','"I cannot comment on your mother, because cows are sacred in my country."','"Love burns, better bring some pepto bismo."'];
var chineseAbout = ['"My girlfriend hated my obsession with Chinese food. Sushi left me."','"I don’t always eat Chinese food, but when I do, I get hungry again an hour later"','"Call me, you’ve got me wonton more already."'];
var italianAbout = ['"Wanna see my cannoli?"', '"Let’s do it, life is about exploring all the pastabilities."', '"Wanna hear an Italian Star Wars joke?  I like my pasta cooked until delicately Chewy."']
var aboutCounter = 0
var aboutText;
var timeoutHandle;
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

// Function for selecting the about mes
function aboutMeSelector (){
  if ($("#input-categories").val() === 'American'){
    aboutText = $('<p id="about-text">' + americanAbout[aboutCounter]+ '</p>')
    dataAboutMe = americanAbout[aboutCounter]
    console.log(dataAboutMe)
    return aboutText, dataAboutMe
  }
  else if ($("#input-categories").val() === 'Mexican'){
    aboutText = $('<p id="about-text">' + mexicanAbout[aboutCounter]+ '</p>')
    dataAboutMe = mexicanAbout[aboutCounter]
    return aboutText, dataAboutMe
  }
    else if ($("#input-categories").val() === 'Thai'){
    aboutText = $('<p id="about-text">' + thaiAbout[aboutCounter]+ '</p>')
    dataAboutMe = thaiAbout[aboutCounter]
    return aboutText, dataAboutMe 
  }
    else if ($("#input-categories").val() === 'Greek'){
    aboutText = $('<p id="about-text">' + greekAbout[aboutCounter]+ '</p>')
    dataAboutMe = greekAbout[aboutCounter]
    return aboutText, dataAboutMe
  }
    else if ($("#input-categories").val() === 'Indian'){
    aboutText = $('<p id="about-text">' + indianAbout[aboutCounter]+ '</p>')
    dataAboutMe = indianAbout[aboutCounter]
    return aboutText, dataAboutMe
  }
    else if ($("#input-categories").val() === 'Chinese'){
    aboutText = $('<p id="about-text">' + chineseAbout[aboutCounter]+ '</p>')
    dataAboutMe = chineseAbout[aboutCounter]
    return aboutText, dataAboutMe 
  }
    else if ($("#input-categories").val() === 'Italian'){
    aboutText = $('<h5 id="about-text">' + italianAbout[aboutCounter]+ '</h5>')
    dataAboutMe = italianAbout[aboutCounter]
    return aboutText, dataAboutMe
  }

}


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
  audio();
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
        var name = $('<h2 id="name-text" class="col-md-12">' + item[i].name + '</h2>');
        var rating = $('<h5 id="rating-text" class="col-md-3"> Rating: ' + item[i].rating + '</h5>');
        // var category = $('<h4 id="category-text" class="col-md-6">' + item[i].categories[0].title + '</h4>');
        var price = $('<div class="col-md-2"></div><h5 id="category-text" class="col-md-3"> Price: ' + item[i].price + '</h5>');
        var aboutMe = $('<h4 id="about-me" class="col-md-12"> About ' + item[i].name + '</h4>');
        aboutMeSelector();
        // conditional if price comes back as undefined
        if (item[i].price === undefined){
          item[i].price = 'N/A'
          price = $('<h5 id="category-text" class="col-md-3"> Price: ' + item[i].price + '</h5>');
        }

        // Attaching tags to the column
        divRow.attr('name',item[i].name);
        divRow.attr('price', item[i].price);
        divRow.attr('rating',item[i].rating);
        divRow.attr('image',item[i].image_url);
        divRow.attr('category',item[i].categories[0].title);
        divRow.attr('latitude',item[i].coordinates.latitude);
        divRow.attr('longitude',item[i].coordinates.longitude);

        divRow.append(name,hateBtn,image,loveBtn,price,rating,aboutMe,lineBreak,aboutText);

        divRow.attr('about',dataAboutMe)
        divRow.attr('url',item[i].url)
        


        // Append our result into the page
        $('#results').append(divRow);
        $('#results').slideDown(2000);
      }
      
      if (aboutCounter === 2){
        aboutCounter = -1;
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
        aboutCounter++
        // pushing items to the firebase console
        database.ref('options' + option + ranNum).push({
          name: $(divRow).attr('name'),
          price: $(divRow).attr('price'),
          category: $(divRow).attr('category'),
          rating: $(divRow).attr('rating'),
          image: $(divRow).attr('image'),
          latitude: $(divRow).attr('latitude'),
          longitude: $(divRow).attr('longitude'),
          about: $(divRow).attr('about'),
          url: $(divRow).attr('url')
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
           aboutCounter++;
           $('#results').slideUp(500);
           yelpCall();
        })
      }      
    });
};

// function for countdown timer (two minutes), next is to add something when it reaches 0.


function retrieve (){
  $('#results').empty();
  var snapRow = $('<div class="row">');
  // retrieving data set from user selections
  database.ref('options' + option + ranNum).on('child_added', function(snapshot){

    var snapName = $('<h2 id="name-text"class="col-md-12">' + snapshot.val().name + '</h2>');
    var snapPrice = $('<div class="col-md-2"></div><h5 id="category-text" class="col-md-3"> Price: ' + snapshot.val().price + '</h5>')
    var snapRating = $('<h5 id="rating-text"class="col-md-3"> Rating: ' + snapshot.val().rating + '</h5>');
    var snapAbout = $('<h4 id="about-me" class="col-md-12"> About ' + snapshot.val().name + '</h4>');
    var snapImage = $('<img id="image-api" class="col-md-7" src="' + snapshot.val().image + '"height="400" width="300">');
    var snapAbout = $('<h4 id="about-me" class="col-md-12"> About ' + snapshot.val().name + '</h4>');
    var snapAboutText = $('<p id="about-text">' + snapshot.val().about + '</p>')
    console.log(snapshot.val().about)
    var latNum = snapshot.val().latitude;
    var lonNum = snapshot.val().longitude;
    var url = $('<a href="' + snapshot.val().url + '"class="col-md-12">Yelp Page</a>');
    snapRow.attr('name',snapshot.val().name);
    snapRow.attr('category',snapshot.val().category);
    snapRow.attr('rating',snapshot.val().rating);
    snapRow.attr('image',snapshot.val().image);
    snapRow.attr('price',snapshot.val().price);
    snapRow.attr('about',snapshot.val().about);

    snapRow.append(snapName,hateBtn,snapImage,loveBtn,snapPrice,snapRating,snapAbout,lineBreak,snapAboutText);
    
    

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
        var finalName = $('<h2 id="name-text"class="col-md-12">' + $(snapRow).attr('name') + '</h2>');
        var finalPrice = $('<div class="col-md-2"></div><h5 id="category-text" class="col-md-3">Price: ' + $(snapRow).attr('price') + '</h5>');
        var finalCategory = $('<h5 id="category-text" class="col-md-6">' + $(snapRow).attr('category') + '</h5>');
        var finalRating = $('<h5 id="rating-text"class="col-md-3"> Rating: ' + $(snapRow).attr('rating') + '</h5>');
        var finalAbout = $('<h4 id="about-me" class="col-md-12"> About ' + $(snapRow).attr('name') + '</h4>');
        var finalAboutText = $('<p id=p" class="col-md-12">' + $(snapRow).attr('about') + '</p>');
        console.log(finalAboutText)
        var finalImage = $('<div class="col-md-2"></div><img id="image-api" class="col-md-7" m-auto src="' + $(snapRow).attr('image') + '"height="400" width="300"><div class="col-md-2"></div>');
        snapRow.append(finalName,finalImage,finalPrice,finalRating,finalAbout,lineBreak,finalAboutText,url);
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

// function for audio 
function audio () {
    var audio = document.getElementById('myAudio');

    audio.play();
};

// Create function to display time to make a choice and use a metric of the time to say get divorce/break up use another api to display dating apps 

//   create a timer function to start once user inputs zip code and clicks submit   