"use strict";

const main = document.getElementById('main');
let enemies = [];
let player;
let playing = false;

startGame();

function startGame() {
    playing = true;
    player = new Player(main);
    window.addEventListener('keydown', function(e) {
        if (e.key == 'ArrowUp')
            player.jump();
    });

    setInterval(() => {
        if (playing)
            enemies.push(new Enemy(main))
    }, 3000);

    setInterval(gameLoop, 200);

}

function gameLoop() {
    if (playing) {
        enemies.forEach(enemy => {
            if(areColliding(player.getPos(), enemy.getPos())) {
                playing = false;
                for (const child of main.children) {
                    child.style.animationPlayState = 'paused';
                }
                player.die();
            }
        });
    }
}

function areColliding(entity1, entity2) {
    return (
        entity1.left < entity2.right &&
        entity1.right > entity2.left &&
        entity1.top < entity2.bottom &&
        entity1.bottom > entity2.top
    )
}