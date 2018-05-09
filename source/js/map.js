google.maps.event.addDomListener(window, 'load', init);

function init() {

  var mapOptions = {
    zoom: 18,
    center: new google.maps.LatLng(59.93843330000001, 30.323323500000015),
    styles:
    [
      {"featureType": "poi.business","elementType": "all","stylers":[{"visibility": "off"}]},{"featureType": "poi.park","elementType": "labels.text","stylers":[{"visibility": "off"}]}]
    };
    var mapElement = document.getElementById("map");
    var marker = new google.maps.MarkerImage(
      "../img/icon-map-marker.svg",
      new google.maps.Size(36,36),
      new google.maps.Point(0,0),
      new google.maps.Point(18,36)
    );

    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
      draggable: true,
      raiseOnDrag: false,
      position: new google.maps.LatLng(59.93843330000001, 30.323323500000015),
      icon: marker,
      map: map
    });
  }
