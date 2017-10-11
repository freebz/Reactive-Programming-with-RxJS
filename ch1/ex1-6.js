Rx.DOM.get('/api/cntents.json').subscribe(
    function onNext(data) { console.log(data.response); },
    function onError(err) { console.error(err); }
);
