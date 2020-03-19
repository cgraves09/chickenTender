

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
                    var image = $('<img src="' + item[i].image_url + '"height="200" width="200">');
                    var name = $('<h1>' + item[i].name + '</h1>');
                    var rating = $('<h3> Rating: ' + item[i].rating + '</h3>');
                    var category = $('<h4>' + item[i].categories[0].title + '</h4>');
                    var divCol = $('<div class="col-md-4">')
                    divCol.append(name,category,rating,image)
                    
                    divRow.append(divCol);
                    // Append our result into our page
                    $('#results').append(divRow);
            } 
        }
    });
})
