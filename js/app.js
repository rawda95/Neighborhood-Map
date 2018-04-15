

      var map;
      var bounds;
       var largeInfowindow ;

     // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
      
    var locations =[];





      // Create a new blank array for all the listing markers.
      var markers = [];

      function initMap() {

        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13,
          mapTypeControl: false
        });
         bounds = new google.maps.LatLngBounds();

   

        largeInfowindow = new google.maps.InfoWindow();

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
            map : map

          });
           bounds.extend(marker.position);

          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow);
          });
        }
                map.fitBounds(bounds);

      }

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }

 

      





// js 



     // This function will loop through the markers array and display them all.
function SetAllMarker() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }



function setSerchMarker(){
     viewModel.locations().forEach(function(location) {

      for (var marker in markers){
        if (markers[marker].title == location.title){
          markers[marker].setMap(map);
          bounds.extend(markers[marker].position);

        }
        map.fitBounds(bounds);
      }
      });
}

var viewModel = {
locations:ko.observableArray(locations),
 query: ko.observable(''),

 showInfow: function(data){
 // console.log(data);
  var elemMarekr;
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].title == data){
      elemMarekr = markers[i];
      break;
    }
        }
  populateInfoWindow(elemMarekr,largeInfowindow);
},

  search: function(value) {
  viewModel.locations([]);
    for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

    if (value == '') {
      viewModel.locations([]);
      viewModel.locations(locations);
      SetAllMarker();
      return;
    }

    for (var location in locations) {
      if (locations[location].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.locations.push(locations[location]);
       // console.log(locations[location])
      }
    }
    setSerchMarker();
}


};
fetchrestaurant();
viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel);	



function maperror(){
alert('Couldn\'t load the goole map');
$('#myUL').hide();


}




//function to fetch restaurant
    function fetchrestaurant() {
        var data;

        $.ajax({
            url: 'https://api.foursquare.com/v2/venues/search',
            dataType: 'json',
            data: 'client_id=IGGB3S4IV5GYLCDHCF00GURI1U3UHYT1NZE1KRJ00IOCSBXH&client_secret=N2DEOYRBOM21VDEEL5MDQPITNINT2G4KDKH0EU3WIFRGQYE4&v=20130815%20&ll=40.7413549,-73.9980244%20&query=restaurant&limit=10',
            async: false,
        }).done(function (response) {
            data = response.response.venues;
            data.forEach(function (restaurant) {
              console.log(restaurant.name , restaurant.location.lat ,restaurant.location.lng);
              var a={title:restaurant.name, location: {lat:restaurant.location.lat, lng:restaurant.location.lng}}
              locations.push(a);
            });
        }).fail(function (response, status, error) {
           locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ];
        });
    }