class Player extends Entity {
    constructor(main) {
        super(main);
        this.element.id = 'player';
        this.element.classList.add('run');
        let jumping = false;
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.element.classList.remove('run');
            this.element.classList.add('jump');
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('jump');
                this.element.classList.add('run');
                this.jumping = false;
            })
        }
    }
}