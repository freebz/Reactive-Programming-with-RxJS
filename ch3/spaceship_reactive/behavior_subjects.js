var subject = new Rx.BehaviorSubject('Waiting for content');

subject.subscribe(
    function(result) {
	document.body.textContent = result.response || result;
    },
    function(err) {
	document.body.textContent = 'There was an error retrieving content';
    }
);

Rx.DOM.get('/remote/content').subscribe(subject);
