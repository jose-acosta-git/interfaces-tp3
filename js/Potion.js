class Potion extends Entity {
    constructor(main) {
        super(main);
        this.element.id = 'potion';
        this.element.classList.add('available');
    }

    drink() {
        this.element.classList.add('drink');
        this.element.addEventListener('animationend', () => {
            this.element.remove();
        })
    }
}