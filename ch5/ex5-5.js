var Rx = require('rx');

var arr = Rx.Observable.range(1000);

arr
    .groupBy(function(value) {
	return value % 2 === 0;
    })
    .map(function(value) {
	return value.observeOn(Rx.Scheduler.default);
    })
    .map(function(groupedObservable) {
	return expensiveOperation(groupedObservable);
    });
