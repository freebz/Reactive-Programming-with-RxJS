var Rx = require('rx')

var source = Rx.Observable.interval(2000)
var observer1 = source.subscribe(function (x) {
    console.log('Observer 1, next value: ' + x);
});

var observer2 = source.subscribe(function (x) {
    console.log('Observer 2, next value: ' + x);
});
