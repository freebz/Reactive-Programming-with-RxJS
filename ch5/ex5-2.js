var Rx = require('rx');

var arr = [];
for (var i=0; i<1000; i++) {
    arr.push(i);
}

var timeStart = Date.now();
Rx.Observable.from(arr, null, null, Rx.Scheduler.default).subscribe(
    function onNext() {},
    function onError() {},
    function onCompleted() {
	console.log('Total time: ' + (Date.now() - timeStart) + 'ms');
    });
