class Light {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }
    getPosition() {
        return this.position;
    }

    getColor() {
        return this.color;
    }
}

export default Light;