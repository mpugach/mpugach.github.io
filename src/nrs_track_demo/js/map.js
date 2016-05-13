/*eslint-disable no-undef */

export const drawMarker = (map, position, current, endDate) => new google.maps.Marker({
  animation: current && google.maps.Animation.BOUNCE,
  map: map,
  position: position,
  title: position.place + '\n' + position.start + '\n' + endDate,
});

export const drawPath = (map, positions, color) => {
  const lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    strokeColor: color,
    strokeOpacity: .9,
  };

  const arrow = {
    icon: lineSymbol,
    repeat: '5%',
    offset: '5%',
  };

  const flightPath = new google.maps.Polyline({
    path: positions,
    strokeColor: color,
    strokeOpacity: .9,
    strokeWeight: 3,
    icons: [arrow, arrow],
  });

  flightPath.setMap(map);
};

export const newMap = () => new google.maps.Map(document.getElementById('map'), {
  zoom: 5,
  center: { lat: 50, lng: 10 },
  mapTypeId: google.maps.MapTypeId.TERRAIN,
});
