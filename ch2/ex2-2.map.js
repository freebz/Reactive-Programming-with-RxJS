var Rx = require('rx');
var logValue = function(val) { console.log(val); };


var src = [1, 2, 3, 4, 5];
var upper = src.map(function(name) {
    return name * 2;
});

upper.forEach(logValue);


var src = Rx.Observable.range(1, 5);
var upper = src.map(function(name) {
    return name * 2;
});

upper.subscribe(logValue);
