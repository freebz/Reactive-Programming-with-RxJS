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
	    if (!enemy.isDead) {
		enemy.shots.push({ x: enemy.x, y: enemy.y });
	    }
	    enemy.shots = enemy.shots.filter(isVisible);
	});

	enemyArray.push(enemy);
	return enemyArray
	    .filter(isVisible)
	    .filter(function(enemy) {
		return !(enemy.isDead && enemy.shots.length === 0);
	    });
    }, []);


function paintEnemies(enemies) {
    enemies.forEach(function(enemy) {
	enemy.y += 5;
	enemy.x += getRandomInt(-15, 15);

	if (!enemy.isDead) {
	    drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
	}

	enemy.shots.forEach(function(shot) {
	    shot.y += SHOOTING_SPEED;
	    drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down');
	});
    });
}

var SHOOTING_SPEED = 15;
/*
function paintHeroShots(heroShots, enemies) {
    heroShots.forEach(function(shot, i) {
	for (var l=0; l<enemies.length; l++) {
	    var enemy = enemies[l];
	    if (!enemy.isDead && collision(shot, enemy)) {
		enemy.isDead = true;
		shot.x = shot.y = -100;
		break;
	    }
	}

	shot.y -= SHOOTING_SPEED;
	drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
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
*/

// Helper function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function collision(target1, target2) {
    return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
	(target1.y > target2.y - 20 && target1.y < target2.y + 20);
}



function gameOver(ship, enemies) {
    return enemies.some(function(enemy) {
	if (collision(ship, enemy)) {
	    return truek;
	}
	
	return enemy.shots.some(function(shot) {
	    return collision(ship, shot);
	});
    });
}


/*
Rx.Observable.combineLatest(
    StarStream, SpaceShip, Enemies, HeroShots,
    function (stars, spaceship, enemies, heroShots) {
	return {
	    stars: stars,
	    spaceship: spaceship,
	    enemies: enemies,
	    heroShots: heroShots
	};
    })
    .sample(SPEED)
    .takeWhile(function(actors) {
	return gameOver(actors.spaceship, actors.enemies) === false;
    })
    .subscribe(renderScene);


function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots, actors.enemies);
}
*/
