class Enemy extends Entity {
    constructor(main) {
        super(main);
        this.element.id = 'enemy';
        this.element.classList.add('idle');
    }

    hit() {
        this.element.style.animationPlayState = 'running';
        this.element.classList.add('enemyHit');
        this.element.addEventListener('animationend', () => {
            this.element.remove();
        })
    }
}