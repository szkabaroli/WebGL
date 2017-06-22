import Model from './model'
import Texture from './texture'
class TexturedModel {
    
    private model : Model;
    private texture : Texture;

    constructor(model : Model, texture : Texture) {
        this.model = model;
        this.texture = texture;
    }

    public getModel() : Model {
        return this.model;
    }
 
    public getTexture() : Texture {
        return this.texture;
    }
}

export default TexturedModel;