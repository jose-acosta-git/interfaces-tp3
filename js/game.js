"use strict";

//Obtencion de elementos del documento
const main = document.getElementById('main');
const magicElem = document.getElementById('magic');
const scoreElem = document.getElementById('score');
const mistElem = document.getElementById('mist');
const menu = document.getElementById('menu');


//Declaracion de variables necesarias para el funcionamiento del juego
let enemies = [];
let potions = [];
let player;
let playing = false;
let magic;
let score;

//boton que da comienzo al juego
document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    for (const child of main.children) {
        child.style.animationPlayState = 'running';
    }
    menu.style.opacity = 0;
    mistElem.style.opacity = 0;
    playing = true;
    magic = 30;
    score = 0;
    magicElem.innerHTML = `Magia restante: ${magic}`;
    scoreElem.innerHTML = `Metros recorridos: ${score}m`;
    player = new Player(main);
    console.log(player.getPos);
    window.addEventListener('keydown', function(e) {
        if ( playing && (e.key == 'ArrowUp'))
            player.jump();
    });

    setInterval(() => {if (playing) gameLoop()}, 17);

    updateStats();

    spawnEntity();
}

//Actualiza la magia y el puntaje cada segundo
function updateStats() {
    setInterval(() => {
        if (playing) {
            magic--;
            magicElem.innerHTML = `Magia restante: ${magic}`;
            score++;
            scoreElem.innerHTML = `Metros recorridos: ${score}m`;
        }
    }, 1000)
}

function spawnEntity() {
    setInterval(() => {
        if (playing) {
            const random = Math.floor(Math.random() * 5);
            if (random < 4) {
                enemies.push(new Enemy(main));
            } else {
                potions.push(new Potion(main));
            }
        }
    }, 1000);
}

function gameLoop() {
    for (const enemy of enemies) {
        if(areColliding(player.getPos(), enemy.getPos())) {
            enemy.hit();
            endGame();
            break;
        }
    }
    /*enemies.forEach(enemy => {
        if(areColliding(player.getPos(), enemy.getPos())) {
            enemy.hit();
            endGame();
        }
    });*/
    potions.forEach(potion => {
        if(areColliding(player.getPos(), potion.getPos())) {
            drinkPotion(potions, potion);
        }
    });
    if (magic == 0)
        endGame();
}

function drinkPotion(potions, potion) {
    potion.drink();
    magic++;
    magicElem.innerHTML = `Magia restante: ${magic}`;
    potions.splice(potions.indexOf(potion), 1);
}

function areColliding(entity1, entity2) {
    return (
        entity1.left < entity2.right &&
        entity1.right > entity2.left &&
        entity1.top < entity2.bottom &&
        entity1.bottom > entity2.top
    )
}

function endGame() {
    playing = false;
    for (const child of main.children) {
        child.style.animationPlayState = 'paused';
    }
    enemies.forEach(enemy => enemy.remove());
    potions.forEach(potion => potion.remove());
    player.die();
    mistElem.style.opacity = 1;
    magicElem.innerHTML = ``;
    scoreElem.innerHTML = `Recorriste un total de: ${score} metros!`;
    player = null;
    potions = [];
    enemies = [];
    menu.style.opacity = 0.8;
}