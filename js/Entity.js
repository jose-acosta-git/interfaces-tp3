class Entity {
    constructor(main) {
        this.element = document.createElement('div');
        main.appendChild(this.element);
    }

    getPos() {
        return this.element.getBoundingClientRect();
    }

    remove() {
        this.element.remove();
    }
}