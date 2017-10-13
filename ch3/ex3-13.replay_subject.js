var Rx = require('rx');

var subject = new Rx.ReplaySubject(null, 200); // Buffer size of 200ms

setTimeout(function() { subject.onNext(1); }, 100);
setTimeout(function() { subject.onNext(2); }, 200);
setTimeout(function() { subject.onNext(3); }, 300);
setTimeout(function() {
    subject.subscribe(function(n) {
	console.log('Received value:', n);
    });
    
    subject.onNext(4);
}, 350);
