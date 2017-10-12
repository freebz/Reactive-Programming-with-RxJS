var p = new Promise(function(resolve, reject) {
    window.setTimeout(resolve, 5000);
});

p.then(function() {
    console.log('Potential side effect!');
});

var subscription = Rx.Observable.fromPromise(p).subscribe(function(msg) {
    console.log('Observable resolved!');
});
subscription.dispose();
