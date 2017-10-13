var playerFiring = Rx.Observable
    .merge(
	Rx.Observable.fromEvent(canvas, 'click'),
	Rx.Observable.fromEvent(canvas, 'keydown')
	    .filter(function(evt) { return evt.keycode === 32; })
    )
    .sample(200)
    .timestamp();


var HeroShots = Rx.Observable
    .combineLatest(
	playerFiring,
	SpaceShip,
	function(shotEvents, spaceShip) {	    
	    return { 
		timestamp: shotEvents.timestamp,
		x: spaceShip.x 
	    };
	})
    .distinctUntilChanged(function(shot) { return shot.timestamp; })
    .scan(function(shotArray, shot) {
	shotArray.push({x: shot.x, y: HERO_Y});
	return shotArray;
    }, []);


/*
var SHOOTING_SPEED = 15;
function paintHeroShots(heroShots) {
    heroShots.forEach(function(shot) {
	shot.y -= SHOOTING_SPEED;
	drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
    });
}

Rx.Observable.combineLatest(
    StarStream, SpaceShip, Enemies, HeroShots,
    function(stars, spaceship, enemies, heroShots) {
	return {
	    stars: stars,
	    spaceship: spaceship,
	    enemies: enemies,
	    heroShots: heroShots
	};
    })
    .sample(SPEED)
    .subscribe(renderScene);


function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots);
}
*/
