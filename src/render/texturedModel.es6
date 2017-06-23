import Model from './model'
import Texture from './texture'
class TexturedModel {
    

    constructor(model, texture) {
        this.model = model;
        this.texture = texture;
    }

    getModel() {
        return this.model;
    }
 
    getTexture() {
        return this.texture;
    }
}

export default TexturedModel;