"use strict";

const main = document.getElementById('main');

startGame();

function startGame() {
    let player = new Player(main);
    window.addEventListener('keydown', function(e) {
        if (e.key == 'ArrowUp')
            player.jump();
    });
}