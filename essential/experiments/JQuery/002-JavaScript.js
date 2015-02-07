var map;

google.maps.event.addDomListener(window, 'load', initialize);

$('#add').live("keypress", function (e) {
    if (e.keyCode == 13) {   //Enter key 
        getAddress();
    }
});

function initialize() {

    var mapCanvas = document.getElementById('map');

    map = new google.maps.Map(mapCanvas);

    getCurrentLocation();
}


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(changeLocation);
    }
}

function changeLocation(position) {
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(14);
}

function getAddress() {
           
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("add").value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var long = results[0].geometry.location.lng();
            map.setCenter(new google.maps.LatLng(lat, long));
            map.setZoom(14);
        }
    });
};
