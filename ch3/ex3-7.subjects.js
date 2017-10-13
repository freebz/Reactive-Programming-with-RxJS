var Rx = require('rx');

var subject = new Rx.Subject();
var source = Rx.Observable.interval(300)
    .map(function(v) { return 'Interval message #' + v; })
    .take(5);

source.subscribe(subject);

var subscription = subject.subscribe(
    function onNext(x) { console.log('onNext: ' + x); },
    function onError(e) { console.log('onError: ' + e.message); },
    function onCompleted() { console.log('onCompleted'); }
);

subject.onNext('Our message #1');
subject.onNext('Our message #2');

setTimeout(function() {
    subject.onCompleted();
}, 1000);
