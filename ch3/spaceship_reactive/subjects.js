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



var delayedRange = Rx.Observable.range(0, 5).delay(1000);
var subject = new Rx.AsyncSubject();

delayedRange.subscribe(subject);

subject.subscribe(
    function onNext(item) { console.log('Value:', item); },
    function onError(err) { console.log('Error', err); },
    function onCompleted() { console.log('Completed.'); }
);



function getProducts(url) {
    var subject;

    return Rx.Observable.create(function(observer) {
	if (!subject) {
	    subject = new Rx.AsyncSubject();
	    Rx.DOM.get(url).subscribe(subject);
	}
	return subject.subscribe(observer);
    });
}

var products = getProducts('/products');
// Will trigger request and receive the response when read
products.subscribe(
    function onNext(result) { console.log('Result 1:', result.response); },
    function onError(error) { console.log('ERROR', error); }
);

// Will receive the result immediately because it's cached
setTimeout(function() {
    products.subscribe(
	function onNext(result) { console.log('Result 2:', result.response); },
	function onError(error) { console.log('ERROR', error); }
    );
}, 5000);
