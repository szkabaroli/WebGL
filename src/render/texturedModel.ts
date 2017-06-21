import Model from './model'
import Texture from './texture'
class TexturedModel {
    
    private model : Model;
    private texture : Texture;

    constructor(rawModel : Model, texture : Texture) {
        this.model = rawModel;
        this.texture = texture;
    }

    public get getModel() : Model {
        return this.model;
    }
 
    public get getTexture() : Texture {
        return this.texture;
    }
}

export default TexturedModel;