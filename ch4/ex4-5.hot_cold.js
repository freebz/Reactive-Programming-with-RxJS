var Rx = require('rx');

// Creatr sn Observable that yields a value every second
var source = Rx.Observable.interval(1000);
var publisher = source.publish();

// Even if we are subscribing, no values are pushed yet.
var observer1 = publisher.subscribe(function (x) {
    console.log('Observer 1: ' + x);
});

// publisher connects and starts publishing values
publisher.connect();

setTimeout(function() {
    // 5 seconds later, observer2 subscribes to it and starts receiving
    // current values, not the whole sequence.
    var observer2 = publisher.subscribe(function (x) {
	console.log('Observer 2: ' + x);
    });
}, 5000);
