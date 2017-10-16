var codeLayers = {}
var quakeLayer = L.layerGroup([]).addTo(map);
var identity = Rx.helpers.identity;

function isHovering(element) {
    var over = Rx.DOM.mouseover(element).map(identity(true));
    var out = Rx.DOM.mouseout(element).map(identity(false));
    
    return over.merge(out);
    
}

function makeRow(props) {
    var row = document.createElement('tr');
    row.id= props.net + props.code;

    var date = new Date(props.time);
    var time = date.toString();
    [props.place, props.mag, time].forEach(function(text) {
	var cell = document.createElement('td');
	cell.textContent = text;
	row.appendChild(cell);
    });
    
    return row;
}

function makeTweetElement(tweetObj) {
    var tweetEl = document.createElement('div');
    tweetEl.className = 'tweet';

    var content = '<img src="$tweetImg" class="avatar" />' +
	'<div class="content">$text</div>' +
	'<div class="time">$time</div>';
    
    var time = new Date(tweetObj.created_at);
    var timeText = time.toLocaleDateSring() + ' ' + time.toLocaleTimeString();

    content = content.replace('$tweetImg', tweetObj.user.profile_image_url);
    content = content.replace('$text', tweetObj.text);
    content = content.replace('$time', timeText);

    tweetEl.innerHTML = content;
    
    return tweetEl;
}

function initialize() {
    var socket = Rx.DOM.fromWebSocket('ws://127.0.0.1:8080');
    var quakes = Rx.Observable
	.interval(5000)
	.flatMap(function() {
	    return Rx.DOM.jsonpRequest({
		url: QUAKE_URL,
		jsonpCallback: 'eqfeed_callback'
	    });
	})
    .flatMap(function(result) {
	return Rx.Observable.from(result.response.features);
    })
    .distinct(function(quake) { return quake.properties.code; })
    .share();

    quakes.subscribe(function(quake) {
	var coords = quake.geometry.coordinates;
	var size = quake.properties.mag * 10000;
	
	var circle = L.circle([coords[1], coords[0]], size).addTo(map);
	quakeLayer.addLayer(circle);
	codeLayers[quake.id] = quakeLayer.getLayerId(circle);
    });

    var table = document.getElementById('quakes_info');

    function getRowFromEvent(event) {
	return Rx.Observable
	    .fromEvent(table, event)
	    .filter(function(event) {
		var el = event.target;
		return el.tagName === 'TD' && el.parentNode.id.length;
	    })
	    .pluck('target', 'parentNode')
	    .distinctUntilChanged();
    }

    getRowFromEvent('mouseover')
	.pairwise()
	.subscribe(function(rows) {
	    var prevCircle = quakeLayer.getLayer(codeLayers[rows[0].id]);
	    var currCircle = quakeLayer.getLayer(codeLayers[rows[1].id]);

	    prevCircle.setStyle({ color: '#0000ff' });
	    currCircle.setStyle({ color: '#ff0000' });
	});

    getRowFromEvent('click')
	.subscribe(function(row) {
	    var circle = quakeLayer.getLayer(codeLayers[row.id]);
	    map.panTo(circle.getLatLng());
	});

    quakes
    	.pluck('properties')
    	.map(makeRow)
    	.subscribe(function(row) { table.appendChild(row); });    

    quakes.bufferWithCount(100)
	.subscribe(function(quakes) {
	    console.log(quakes);
	    var quakesData = quakes.map(function(quake) {
		return {
		    id: quake.properties.net + quake.properties.code,
		    lat: quake.geometry.coordinates[1],
		    lng: quake.geometry.coordinates[0],
		    mag: quake.properties.mag
		};
	    });
	    socket.onNext(JSON.stringify({quakes: quakesData }));
	});
    
/*
    socket.subscribe(function(message) {
	console.log(JSON.parse(message.data));
    });
*/
    socket
	.map(function(message) { return JSON.parse(message.data); })
	.subscribe(function(data) {
	    var container = document.getElementById('tweet_container');
	    container.insertBefore(makeTweetElement(data), container.firstChild);
	});

}

Rx.DOM.ready().subscribe(initialize);
