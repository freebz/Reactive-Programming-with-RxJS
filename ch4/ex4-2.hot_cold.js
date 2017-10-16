var Rx = require('rx');

function printValue(value) {
    console.log(value);
}

var rangeToFive = Rx.Observable.range(1, 5);
var obs1 = rangeToFive.subscribe(printValue); // 1, 2, 3, 4, 5

var obs2 = Rx.Observable.just()
    .delay(2000)
    .flatMap(function() {
	return rangeToFive.subscribe(printValue); // 1, 2, 3, 4, 5
    });
