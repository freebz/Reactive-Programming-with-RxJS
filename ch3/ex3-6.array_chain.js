var Rx = require('rx');

function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = 15;
    var randomString = '';
    for (var i=0; i<string_length; i++) {
	var rnum = Math.floor(Math.random() * chars.length);
	randomString += chars.substring(rnum,rnum+1);
    }
    return randomString;
}

var stringArray = [];
for (var i = 0; i < 1000; i++) {
    stringArray.push(randomString());
}

var stringObservable = Rx.Observable.from(stringArray);

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
