var onMove = Rx.Observable.fromEvent(document, 'mousemove');
var subscriber1 = onMove.subscribe(function(e) {
    console.log('Subscriber1:', e.clientX, e.clienY);
});
var subscriber2 = onMove.subscribe(function(e) {
    console.log('Subscriber2:', e.clientX, e.clientY);
});
