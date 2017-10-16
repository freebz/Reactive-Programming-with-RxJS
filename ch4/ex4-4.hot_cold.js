var Rx = require('rx');

var source = Rx.Observable.interval(1000);
var observer1 = source.subscribe(function (x) {
    console.log('Observer 1: ' + x);
});

setTimeout(function() {
    var observer2 = source.subscribe(function (x) {
	console.log('Observer 2: ' + x);
    });
}, 3000);
