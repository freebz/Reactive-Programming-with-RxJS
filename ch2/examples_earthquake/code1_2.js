var quakes = Rx.DOM.jsonpRequest({
    url: QUAKE_URL,
    jsonpCallback: 'eqfeed_callback'
})
.flatMap(function transform(result) {
    return Rx.Observable.from(result.response.features);
})
.map(function(quake) {
    return {
	lat: quake.geometry.coordinates[1],
	lng: quake.geometry.coordinates[0],
	size: quake.properties.mag * 1000
    };
    var coords = quake.geometry.coordinates;
    var size = quake.properties.mag * 10000;

});

quakes.subscribe(function(quake) {
    L.circle([quake.lat, quake.lng], quake.size).addTo(map);
});
