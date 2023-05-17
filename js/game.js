"use strict";

const main = document.getElementById('main');
let enemies = [];
let player;

startGame();

function startGame() {
    player = new Player(main);
    window.addEventListener('keydown', function(e) {
        if (e.key == 'ArrowUp')
            player.jump();
    });

    setInterval(() => {
        enemies.push(new Enemy(main))
    }, 3000);

    setInterval(gameLoop, 200);

}

function gameLoop() {
    enemies.forEach(enemy => {
        if(areColliding(player.getPos(), enemy.getPos())) {
            console.log('colission')
            //played.die();
            //enemy.hit();
        }
    });
}

function areColliding(entity1, entity2) {
    return (
        entity1.left < entity2.right &&
        entity1.right > entity2.left &&
        entity1.top < entity2.bottom &&
        entity1.bottom > entity2.top
    )
}