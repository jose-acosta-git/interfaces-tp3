class Potion extends Entity {
    constructor(main) {
        super(main);
        this.element.id = 'potion';
        this.element.classList.add('available');
        this.soundEffect = new Audio('sounds/potion.wav');
    }

    drink() {
        this.soundEffect.play();
        this.element.classList.add('drink');
        this.element.addEventListener('animationend', () => {
            this.element.remove();
        })
    }
}