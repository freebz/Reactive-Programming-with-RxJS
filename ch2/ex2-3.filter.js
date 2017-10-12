var Rx = require('rx');
var logValue = function(val) { console.log(val); };
var isEven = (function(val) { return val % 2 !== 0; });


var src = [1, 2, 3, 4, 5];
var even = src.filter(isEven);

even.forEach(logValue);


var src = Rx.Observable.range(1, 5);
var even = src.filter(isEven);

even.subscribe(logValue);
