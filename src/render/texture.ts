class Texture {
    private textureId;

    constructor(textureId : number) {
        this.textureId = textureId;
    }

    public get getTextureId() {
        return this.textureId;
    }
}

export default Texture;