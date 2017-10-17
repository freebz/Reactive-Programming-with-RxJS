var h = CycleDOM.h;
var SearchBox = require('./searchbox');

function main(responses) {
    var wpSearchBox = SearchBox({
	DOM: responses.DOM,
	props$: Rx.Observable.just({
	    apiUrl: API_URL
	})
    });

    var searchDOM$ = wpSearchBox.DOMTree;
    var searchResults$ = responses.JSONP
	.filter(function(res$) {
	    return res$.request.indexOf(API_URL) === 0;
	})
	.concatAll()
	.pluck('query', 'search')
	.startWith([]);

    return {
	JSONP: wpSearchBox.JSONPQuery,
	DOM: Rx.Observable.combineLatest(
	    searchDOM$, searchResults$, function(tree, links) {
		return h('div', [
		    h('h1', 'Wikipedia Search '),
		    tree,
		    h('hr'),
		    h('div', links.map(function(link) {
			return h('div', [
			    h('a', { href: WIKI_URL + link.title }, link.title)
			]);
		    }))
		]);
	    })
    };
}

Cycle.run(main, {
    DOM: CycleDOM.makeDOMDriver('#container'),
    JSONP: CycleJSONP.makeJSONPDriver()
});
