"use strict";

const main = document.getElementById('main');
const magicElem = document.getElementById('magic');
const scoreElem = document.getElementById('score');
let enemies = [];
let potions = [];
let player;
let playing = false;
let magic;
let score;

startGame();

function startGame() {
    playing = true;
    magic = 5;
    score = 0;
    magicElem.innerHTML = `Magia restante: ${magic}`;
    player = new Player(main);
    window.addEventListener('keydown', function(e) {
        if (e.key == 'ArrowUp')
            player.jump();
    });

    setInterval(gameLoop, 17);

    setInterval(() => {
        if (playing) {
            magic--;
            magicElem.innerHTML = `Magia restante: ${magic}`;
            score++;
            scoreElem.innerHTML = `Puntos: ${score}`;
        }
    }, 1000)

    //Pushear random cada 1s

    setInterval(() => {
        if (playing)
            enemies.push(new Enemy(main))
    }, 3000);

    setInterval(() => {
        if (playing)
            potions.push(new Potion(main))
    }, 2000);

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
        potions.forEach(potion => {
            if(areColliding(player.getPos(), potion.getPos())) {
                potion.drink();
                magic++;
                magicElem.innerHTML = `Magia restante: ${magic}`;
                potions.splice(potions.indexOf(potion), 1);
            }
        })
        if (magic == 0) {
            playing = false;
            for (const child of main.children) {
                child.style.animationPlayState = 'paused';
            }
            player.die();
        }
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