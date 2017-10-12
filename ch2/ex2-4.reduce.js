var Rx = require('rx');
var logValue = function(val) { console.log(val); };


var src = [1, 2, 3, 4, 5];
var sum = src.reduce(function(a, b) {
    return a + b;
});

console.log(sum);


var src = Rx.Observable.range(1, 5);
var sum = src.reduce(function(acc, x) {
    return acc + x;
});

sum.subscribe(logValue);
