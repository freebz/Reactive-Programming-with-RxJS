var Rx = require('rx');

var subject = new Rx.ReplaySubject(2); // Buffer size of 2

subject.onNext(1);
subject.onNext(2);
subject.onNext(3);

subject.subscribe(function(n) {
    console.log('Received value:', n);
});
