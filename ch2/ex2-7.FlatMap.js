function concatAll(source) {
    return source.reduce(function(a, b) {
	return a.concat(b);
    });
}


concatAll([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
