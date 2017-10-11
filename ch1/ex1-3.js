Rx.Observable.fromEvent(document, 'click')
    .filter(function(c) { return c.clientX > window.innerWidth / 2; })
    .take(10)
    .subscribe(function(c) { console.log(c.clientX, c.clientY) })
