var Rx = require('rx');


var evenTicks = 0;

function updateDistance(i) {
    if (i % 2 === 0) {
	evenTicks += 1;
    }
    return evenTicks;
}

var ticksObservable = Rx.Observable
    .interval(1000)
    .map(updateDistance)

ticksObservable.subscribe(function() {
    console.log('Subscriber 1 - evenTicks: ' + evenTicks + ' so far');
});
