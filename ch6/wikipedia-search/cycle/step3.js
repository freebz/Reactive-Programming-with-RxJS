function main(responses) {
    var vtree$ = responses.JSONP
	.filter(function(res$) {
	    return res$.request.indexOf(API_URL) === 0;
	})
	.mergeAll()
	.pluck('query', 'search')
	.startWith([])
	.map(vtreeElements);

    return {
	DOM: vtree$,
	JSONP: searchRequest(responses)
    };
}
