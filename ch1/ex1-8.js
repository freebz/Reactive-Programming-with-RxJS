var allMoves = Rx.Observable.fromEvent(document, 'mousemove')
allMoves.subscribe(function(e) {
    console.log(e.clientX, e.clientY);
});
