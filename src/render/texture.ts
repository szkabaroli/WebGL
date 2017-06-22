class Texture {
    private textureId : number;

    constructor(textureId : number) {
        this.textureId = textureId;
    }

    public getTextureId() {
        return this.textureId;
    }
}

export default Texture;