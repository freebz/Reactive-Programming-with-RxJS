var onNext = Rx.ReactiveTest.onNext;
QUnit.test("Test value order", function(assert) {
    var scheduler = new Rx.TestScheduler();
    var subject = scheduler.createColdObservable(
	onNext(100, 'first'),
	onNext(200, 'second'),
	onNext(300, 'third')
    );

    var result = '';
    subject.subscribe(function(value) { result = value });
    
    scheduler.advanceBy(100);
    ssert.equal(result, 'first');
    
    scheduler.advanceBy(100);
    assert.equal(result, 'second');
    
    scheduler.advanceBy(100);
    assert.equal(result, 'third');
});
