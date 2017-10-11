var observable = Rx.Observable.create(function(observer) {
    observer.onNext('Simon');
    observer.onNext('Jen');
    observer.onNext('Sergi');
    observer.onCompleted(); // We are done
});

var observer = Rx.Observer.create(
    function onNext(x) { console.log('Next: ' + x); },
    function onError(err) { console.log('Error: ' + err); },
    function onCompleted() { console.log('Completed'); }
);
