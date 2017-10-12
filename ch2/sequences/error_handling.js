// This will try to retrieve the remote URL up to 5 times.
Rx.DOM.get('/products').retry(5)
    .subscribe(
	function(xhr) { console.log(xhr); },
	function(err) { console.error('ERROR: ', err); }
    );
