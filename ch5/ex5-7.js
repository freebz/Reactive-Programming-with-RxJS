var Rx = require('rx');

console.log('Before subscription');
Rx.Observable.range(1, 5)
    .do(function(a) {
	console.log('Processing value', a);
    })
    .observeOn(Rx.Scheduler.default)
    .map(function(value) { return value * value; })
    .subscribe(function(value) { console.log('Emitted', value); });
console.log('After subscription');
