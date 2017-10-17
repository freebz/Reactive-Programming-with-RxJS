function animationLoop(scheduler) {
    return Rx.Observable.generate(
	0,
	function() { return true; }, // Keep generating forever
	function(x) { return x + 1; }, // Increment interval value
	function(x) { return x; }, // Value to return on each notification
	Rx.Scheduler.requestAnimationFrame); // Schedule to requestAnimationFrame
}


var StarStream = Rx.Observable.range(1, 250)
    .map(function() {
	return {
	    x: parseInt(Math.random() * canvas.width),
	    y: parseInt(Math.random() * canvas.height),
	    size: Math.random() * 3 + 1
	};
    })
    .toArray()
    .flatMap(function(arr) {
	return animationLoop().map(function() {
	    return arr.map(function(star) {
		if (star.y >= canvas.height) {
		    star.y = 0;
		}
		star.y += 3;
		return star;
	    });
	});
    });
