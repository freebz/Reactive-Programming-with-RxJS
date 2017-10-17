var Rx = require('rx');

// Be careful: the code below will freeze your environment!
Rx.Observable.return(10).repeat().take(1)
    .subscribe(function(value) {
	console.log(value);
    });
