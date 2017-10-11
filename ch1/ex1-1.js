var button = document.getElementById('retrieveDataBtn');
var source1 = Rx.DOM.getJSON('/resource1').pluck('name');
var source2 = Rx.DOM.getJSON('/resource2').pluck('props', 'name');

function getResults(amount) {
    return source1.merge(source2)
	.pluck('names')
	.flatMap(function(array) { return Rx.Observable.from(array); })
	.distinct()
	.take(amount);
}

var clicks = Rx.Observable.fromEventb(button, 'click');
clicks.debounce(1000)
    .flatMap(getResults(5))
    .subscribe(
	function(value) { console.log('Received value', value); },
	function(err) { console.error(err); },
	function() { console.log('All values retrieved!'); }
    );
