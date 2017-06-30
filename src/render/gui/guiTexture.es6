class GUITexture {
    constructor(texture, position, scale) {
        this.texture = texture;
        this.position = position;
        this.scale = scale;
    }

    getTexture() {
        return this.texture;
    }

    getPosition() {
        return this.position;
    }

    getScale() {
        return this.scale;
    }
}

export default GUITexture;