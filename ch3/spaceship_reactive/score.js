function paintScore(score) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('Score: ' + score, 40, 43);
}


var ScoreSubject = new Rx.Subject();
var score = ScoreSubject.scan(function (prev, cur) {
    return prev + cur;
}, 0).concat(Rx.Observable.return(0));


var SCORE_INCREASE = 10;
function paintHeroShots(heroShots, enemies) {
    heroShots.forEach(function(shot, i) {
	for (var l=0; l<enemies.length; l++) {
	    var enemy = enemies[l];
	    if (!enemy.isDead && collision(shot, enemy)) {
		ScoreSubject.onNext(SCORE_INCREASE);
		enemy.isDead = true;
		shot.x = shot.y = -100;
		break;
	    }
	}

	shot.y -= SHOOTING_SPEED;
	drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
    });
}


function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots, actors.enemies);
    paintScore(actors.score);
}

Rx.Observable.combineLatest(
    StarStream, SpaceShip, Enemies, HeroShots, score,
    function (stars, spaceship, enemies, heroShots, score) {
	return {
	    stars: stars,
	    spaceship: spaceship,
	    enemies: enemies,
	    heroShots: heroShots,
	    score: score
	};
    })
    .sample(SPEED)
    .takeWhile(function(actors) {
	return gameOver(actors.spaceship, actors.enemies) === false;
    })
    .subscribe(renderScene);
