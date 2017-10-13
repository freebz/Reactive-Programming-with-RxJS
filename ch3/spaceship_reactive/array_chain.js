stringObservable
    .map(function(str) {
	return str.toUpperCase();
    })
    .filter(function(str) {
	return /^[A-Z]+$/.test(str);
    })
    .take(5)
    .subscribe(function(str) {
	console.log(str)
    });
