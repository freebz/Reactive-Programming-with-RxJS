var Rx = require('rx');

var scheduler = Rx.Scheduler.currentThread;
Rx.Observable.return(10, scheduler).repeat().take(1)
    .subscribe(function(value) {
	console.log(value);
    });
