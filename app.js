var counter = 0;


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
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

$('#button').click(function(event){
    event.preventDefault();
    var zipCode = $('#zip-code').val();
    console.log(zipCode)
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + zipCode + "&limit=10";
    
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
            
            // If our results are greater than 0, continue
            var divRow = $('<div class="row">')
                // Itirate through the JSON array of 'businesses' which was returned by the API
                for (var i = 0; i < data.businesses.length; i++){
                    var item = data.businesses
                    var image = $('<img id="image-api" src="' + item[i].image_url + '"height="200" width="200">');
                    var name = $('<h1 id="name-text">' + item[i].name + '</h1>');
                    var rating = $('<h3 id="rating-text"> Rating: ' + item[i].rating + '</h3>');
                    var category = $('<h4 id="category-text">' + item[i].categories[0].title + '</h4>');
                    var divCol = $('<div class="col-md-4 choice">')
                    var selectBtn = $('<br><button id="select-btn" class="btn"> Add To selection </button>')
                    // Attaching tags to the column
                    divCol.attr('name',item[i].name);
                    divCol.attr('category',item[i].categories[0].title);
                    divCol.attr('rating',item[i].rating);
                    divCol.attr('image',item[i].image_url);
                    divCol.append(name,category,rating,image,selectBtn);
                    divRow.append(divCol);
                    // Append our result into our page
                    $('#results').append(divRow);
            } 
            
            $('.choice').click(function(event){
                event.preventDefault();
                counter++ 
                database.ref().push({
                    name: $(this).attr('name'),
                    category: $(this).attr('category'),
                    rating: $(this).attr('rating'),
                    image: $(this).attr('image'),
                })
                $(this).empty();
                if (counter === 3) {
                    $('#results').empty();
                    counter = 0;
                    retrieve();
                }
            })
        }
    });
})

function retrieve (){
    var snapRow = $('<div class="row">');
    database.ref().on('child_added', function(snapshot){
        var snapCol = $('<div class="col-md-4 choice">');
        var snapName = $('<h1 id="name-text">' + snapshot.val().name + '</h1>');
        var snapCategory = $('<h4 id="category-text">' + snapshot.val().category + '</h4>');
        var snapRating = $('<h3 id="rating-text"> Rating: ' + snapshot.val().rating + '</h3>');
        var snapImage = $('<img id="image-api" src="' + snapshot.val().image + '"height="200" width="200">');
        snapCol.append(snapName,snapCategory,snapRating,snapImage);
        snapRow.append(snapCol);
        $('#results').append(snapRow);
    })
    $('.choice').click(function(event){
        event.preventDefault();
        counter++;
        console.log(counter);
        if (counter === 1){
            console.log($(this).attr('name'));
        }
    })

}


