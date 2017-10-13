function isVisible(obj) {
    return obj.x > -40 && obj.x < canvas.width + 40 &&
	obj.y > -40 && obj.y < canvas.height + 40;
}

var ENEMY_FREQ = 1500;
var ENEMY_SHOOTING_FREQ = 750;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
    .scan(function(enemyArray) {
	var enemy = {
	    x: parseInt(Math.random() * canvas.width),
	    y: -30,
	    shots: []
	};

	Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(function() {
	    enemy.shots.push({ x: enemy.x, y: enemy.y });
	    enemy.shots = enemy.shots.filter(isVisible);
	});

	enemyArray.push(enemy);
	return enemyArray.filter(isVisible);
    }, []);


function paintEnemies(enemies) {
    enemies.forEach(function(enemy) {
	enemy.y += 5;
	enemy.x += getRandomInt(-15, 15);

	drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');

	enemy.shots.forEach(function(shot) {
	    shot.y += SHOOTING_SPEED;
	    drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down');
	});
    });
}


var Game = Rx.Observable
    .combineLatest(
	StarStream, SpaceShip, Enemies,
	function(stars, spaceship, enemies) {
	    return {
		stars: stars,
		spaceship: spaceship,
		enemies: enemies
	    };
	})
    .sample(SPEED)
    .subscribe(renderScene);


// Helper function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
