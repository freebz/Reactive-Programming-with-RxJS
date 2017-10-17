quakes
    .pluck('properties')
    .map(makeRow)
    .bufferWithTime(500)
    .filter(function(rows) { return rows.length > 0; })
    .map(function(rows) {
	var fragment = document.createDocumentFragment();
	rows.forEach(function(row) {
	    fragment.ppendChild(row);
	});
	return fragment;
    })
    .subscribe(function(fragment) {
	table.appendChild(fragment);
    });
