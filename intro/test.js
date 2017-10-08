var Rx = require('rx');

Rx.Observable.just('Hello World!').subscribe(function(value) {
    console.log(value);
});
