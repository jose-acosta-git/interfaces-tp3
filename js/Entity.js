class Entity {
    constructor(main) {
        this.element = document.createElement('div');
        main.appendChild(this.element);
    }

    getPos() {
        return this.element.getBoundingClientRect();
    }

    //Elimina el elemento del documento
    remove() {
        this.element.remove();
    }
}