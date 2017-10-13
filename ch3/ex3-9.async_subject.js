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
