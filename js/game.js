"use strict";

//Obtencion de elementos del documento
const main = document.getElementById('main');
const magicElem = document.getElementById('magic');
const scoreElem = document.getElementById('score');
const mistElem = document.getElementById('mist');
const menu = document.getElementById('menu');
const title = document.getElementById('title');
const startBtn = document.getElementById('start');


//Declaracion de variables necesarias para el funcionamiento del juego
let player;
let enemies = [];
let potions = [];

let magic;
let score;

let playing = false;
let wasSpawned = false;
let wasUpdated = false;

//Crea los objetos de tipo audio del menu y del juego
const menuSong = new Audio('sounds/menu.mp3');
menuSong.volume = 0.3;
const playingSong = new Audio('sounds/playing.mp3');
playingSong.volume = 0.5;

//Boton que da comienzo al juego
startBtn.addEventListener('click', startGame);

function startGame() {
    menuSong.pause();
    menuSong.currentTime = 0;
    playingSong.play();
    for (const child of main.children) {
        child.style.animationPlayState = 'running';
    }
    menu.style.opacity = 0;
    mistElem.style.opacity = 0;
    playing = true;

    magic = 20;
    score = 0;
    magicElem.innerHTML = `Magia restante: ${magic}`;
    scoreElem.innerHTML = `Metros recorridos: ${score}m`;

    player = new Player(main);

    window.addEventListener('keydown', function(e) {
        if ( playing && (e.key == 'ArrowUp'))
            player.jump();
    });

    setInterval(() => {if (playing) gameLoop()}, 17);

    if (!wasUpdated) updateStats();

    if (!wasSpawned) spawnEntity();
}

//Actualiza la magia y los metros recorridos cada segundo
function updateStats() {
    wasUpdated = true;
    setInterval(() => {
        if (playing) {
            magic--;
            magicElem.innerHTML = `Magia restante: ${magic}`;
            score++;
            scoreElem.innerHTML = `Metros recorridos: ${score}m`;
        }
    }, 1000)
}

//Crea una entidad cada segundo, con mas probabilidad de crear un enemigo que una pocion
function spawnEntity() {
    wasSpawned = true;
    setInterval(() => {
        if (playing) {
            const random = Math.floor(Math.random() * 5);
            if (random < 3) {
                enemies.push(new Enemy(main));
            } else {
                potions.push(new Potion(main));
            }
        }
    }, 1000);
}

//Verifica si el personaje colisiona con una entidad o si se queda sin magia
function gameLoop() {
    for (const enemy of enemies) {
        if(areColliding(player.getPos(), enemy.getPos())) {
            endGame(enemy);
            break;
        }
    }
    potions.forEach(potion => {
        if(areColliding(player.getPos(), potion.getPos())) {
            drinkPotion(potions, potion);
        }
    });
    if (magic == 0)
        endGame();
}

//Ejecuta la accion de tomar una pocion y actualiza la magia
function drinkPotion(potions, potion) {
    potion.drink();
    magic++;
    magicElem.innerHTML = `Magia restante: ${magic}`;
    potions.splice(potions.indexOf(potion), 1);
}

//Verifica si las dos entidades estan colisionando
function areColliding(entity1, entity2) {
    return (
        entity1.left < entity2.right &&
        entity1.right > entity2.left &&
        entity1.top < entity2.bottom &&
        entity1.bottom > entity2.top
    )
}

//Termina el juego y vuelve a mostrar el menu
function endGame(enemy = null) {
    playingSong.pause();
    playingSong.currentTime = 0;
    menuSong.play();
    playing = false;
    for (const child of main.children) {
        child.style.animationPlayState = 'paused';
    }
    player.die();
    if (enemy) enemy.hit();
    //Espera a que se reproduzcan animaciones y sonidos
    setTimeout(() => {
        player = null;
        enemies.forEach(enemy => enemy.remove());
        potions.forEach(potion => potion.remove());
        potions = [];
        enemies = [];
        title.innerHTML = `Recorriste un total de: ${score} metros!`;
        mistElem.style.opacity = 1;
        magicElem.innerHTML = ``;
        scoreElem.innerHTML = ``;
        menu.style.opacity = 0.8;
    }, 1000);
}